import { Router } from 'express'
import multer from 'multer'
import crypto from 'crypto'
import path from 'path'
import { pool } from '../db.js'
import { requireAuth } from '../middleware/auth.js'

export const uploadsRouter = Router()

// จำกัดขนาดไฟล์ 25 MB
const MAX_SIZE = 25 * 1024 * 1024

// เก็บไฟล์ไว้ใน memory ก่อนบันทึกลง PostgreSQL
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_SIZE,
  },
})

// โฟลเดอร์ที่อนุญาตให้อัปโหลด
const ALLOWED_FOLDERS = new Set([
  'doctor',
  'nurse',
  'pharmacy',
  'photo',
  'emp',
  'med',
  'mservice',
  'avatar',
  'pt',
  'marketing',
  'technician',
  'hr',
])

// ---------------------------------------------------------
// POST /api/uploads
// multipart/form-data
// field: file
// field: folder
// ---------------------------------------------------------
uploadsRouter.post('/', upload.single('file'), async (req, res) => {
  try {
    const { folder } = req.body || {}
    const file = req.file

    // ไม่พบไฟล์
    if (!file) {
      return res.status(400).json({
        error: 'ไม่พบไฟล์ที่อัปโหลด',
      })
    }

    // ตรวจสอบ folder
    if (!ALLOWED_FOLDERS.has(folder)) {
      return res.status(400).json({
        error: 'folder ไม่ถูกต้อง',
      })
    }

    // นามสกุลไฟล์เดิม
    const ext = path.extname(file.originalname)

    // สร้างชื่อไฟล์ใหม่ไม่ซ้ำกัน
    const storedName = `${crypto.randomUUID()}${ext}`

    // ---------------------------------------------------------
    // 1) Insert ข้อมูลก่อน เพื่อให้ได้ id
    // ---------------------------------------------------------
    const inserted = await pool.query(
      `
      INSERT INTO uploads (
        folder,
        original_name,
        stored_name,
        url,
        mime_type,
        size_bytes,
        uploaded_by,
        data
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8
      )
      RETURNING id
      `,
      [
        folder,
        file.originalname,
        storedName,
        '',
        file.mimetype,
        file.size,
        'staff',
        file.buffer,
      ],
    )

    const newId = inserted.rows[0].id

    // ---------------------------------------------------------
    // 2) สร้าง URL สำหรับดาวน์โหลดไฟล์
    // ---------------------------------------------------------
    const fileUrl = `/api/uploads/${newId}/download`

    // ---------------------------------------------------------
    // 3) Update URL
    // ---------------------------------------------------------
    const { rows } = await pool.query(
      `
      UPDATE uploads
      SET url = $1
      WHERE id = $2
      RETURNING
        id,
        folder,
        original_name,
        stored_name,
        url,
        mime_type,
        size_bytes,
        uploaded_by,
        created_at
      `,
      [fileUrl, newId],
    )

    return res.status(201).json(rows[0])
  } catch (error) {
    console.error('Upload error:', error)

    return res.status(500).json({
      error: 'ไม่สามารถอัปโหลดไฟล์ได้',
    })
  }
})

// ---------------------------------------------------------
// GET /api/uploads?folder=doctor
// แสดงรายการไฟล์ โดยไม่ส่ง data กลับ
// ---------------------------------------------------------
uploadsRouter.get('/', async (req, res) => {
  try {
    const { folder } = req.query

    const params = []

    let sql = `
      SELECT
        id,
        folder,
        original_name,
        stored_name,
        url,
        mime_type,
        size_bytes,
        uploaded_by,
        created_at
      FROM uploads
    `

    if (folder) {
      params.push(folder)
      sql += ` WHERE folder = $1`
    }

    sql += ` ORDER BY created_at DESC`

    const { rows } = await pool.query(sql, params)

    return res.json(rows)
  } catch (error) {
    console.error('Get uploads error:', error)

    return res.status(500).json({
      error: 'ไม่สามารถดึงรายการไฟล์ได้',
    })
  }
})

// ---------------------------------------------------------
// GET /api/uploads/:id/download
// ดาวน์โหลด/เปิดไฟล์จริงจาก PostgreSQL BYTEA
// ---------------------------------------------------------
uploadsRouter.get('/:id/download', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `
      SELECT
        original_name,
        mime_type,
        data
      FROM uploads
      WHERE id = $1
      `,
      [req.params.id],
    )

    const file = rows[0]

    if (!file) {
      return res.status(404).json({
        error: 'ไม่พบไฟล์',
      })
    }

    res.setHeader(
      'Content-Type',
      file.mime_type || 'application/octet-stream',
    )

    res.setHeader(
      'Content-Disposition',
      `inline; filename="${encodeURIComponent(file.original_name)}"`,
    )

    // ✅ เพิ่มบรรทัดนี้ กัน Cloudflare/Render CDN cache response ค้าง
    res.setHeader('Cache-Control', 'no-store')

    return res.send(file.data)
  } catch (error) {
    console.error('Download error:', error)

    return res.status(500).json({
      error: 'ไม่สามารถเปิดไฟล์ได้',
    })
  }
})

// ---------------------------------------------------------
// DELETE /api/uploads/:id
// ลบไฟล์ - ต้อง Login
// ---------------------------------------------------------
uploadsRouter.delete('/:id', requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      `
      DELETE FROM uploads
      WHERE id = $1
      `,
      [req.params.id],
    )

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: 'ไม่พบไฟล์ที่ต้องการลบ',
      })
    }

    return res.json({
      ok: true,
    })
  } catch (error) {
    console.error('Delete upload error:', error)

    return res.status(500).json({
      error: 'ไม่สามารถลบไฟล์ได้',
    })
  }
})
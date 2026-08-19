import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import { authRouter } from './routes/auth.js'
import { contentRouter } from './routes/content.js'
import { uploadsRouter } from './routes/uploads.js'
import { usersRouter } from './routes/users.js'
import { rolesRouter } from './routes/roles.js'

const app = express()

// ===============================
// CORS
// ===============================

// ดึง Origin จาก Environment Variable
// ตัวอย่าง:
// CORS_ORIGIN=http://localhost:5173,https://intranet-f.vercel.app
const allowedOrigins = (
  process.env.CORS_ORIGIN ||
  'http://localhost:5173,https://intranet-f.vercel.app'
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      // อนุญาต request ที่ไม่มี Origin เช่น Postman หรือ health check
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`))
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

app.use(express.json({ limit: '2mb' }))

// ===============================
// Health Check
// ===============================

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

// ===============================
// Routes
// ===============================

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/roles', rolesRouter)
app.use('/api/content', contentRouter)
app.use('/api/uploads', uploadsRouter)

// ===============================
// Error Handler
// ===============================

app.use((err, req, res, next) => {
  console.error(err)

  // CORS Error
  if (err.message?.startsWith('CORS blocked')) {
    return res.status(403).json({
      error: err.message,
    })
  }

  // Upload file size error
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      error: 'ไฟล์ใหญ่เกิน 25MB',
    })
  }

  res.status(500).json({
    error: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์',
  })
})

// ===============================
// Start Server
// ===============================

const port = process.env.PORT || 3001

app.listen(port, '0.0.0.0', () => {
  console.log(`intranet-backend กำลังทำงานที่ port ${port}`)
})
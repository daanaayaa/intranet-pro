import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import { authRouter } from './routes/auth.js'
import { contentRouter } from './routes/content.js'
import { uploadsRouter } from './routes/uploads.js'
import { usersRouter } from './routes/users.js'
import { rolesRouter } from './routes/roles.js'

const app = express()

// CORS
app.use(
  cors({
    origin: 'https://intranet-f.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

app.use(express.json({ limit: '2mb' }))

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/roles', rolesRouter)
app.use('/api/content', contentRouter)
app.use('/api/uploads', uploadsRouter)

app.use((err, req, res, next) => {
  console.error(err)

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      error: 'ไฟล์ใหญ่เกิน 25MB',
    })
  }

  res.status(500).json({
    error: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์',
  })
})

const port = process.env.PORT || 3001

app.listen(port, '0.0.0.0', () => {
  console.log(`intranet-backend กำลังทำงานที่ port ${port}`)
})
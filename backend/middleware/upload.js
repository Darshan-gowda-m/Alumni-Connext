// middleware/upload.js
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    const allowed = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png']
    cb(null, allowed.includes(ext))
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
})

module.exports = upload

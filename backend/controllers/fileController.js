const upload = require('../middleware/upload')

module.exports = {
  uploadResume: (req, res) => {
    upload.single('resume')(req, res, async (err) => {
      if (err) return res.status(400).json({ error: err.message })

      await User.findByIdAndUpdate(req.user.id, {
        resume: `/uploads/${req.file.filename}`,
      })

      res.json({ url: `/uploads/${req.file.filename}` })
    })
  },

  uploadProfilePicture: (req, res) => {
    upload.single('avatar')(req, res, async (err) => {
      if (err) return res.status(400).json({ error: err.message })

      await User.findByIdAndUpdate(req.user.id, {
        avatarUrl: `/uploads/${req.file.filename}`,
      })

      res.json({ url: `/uploads/${req.file.filename}` })
    })
  },
}

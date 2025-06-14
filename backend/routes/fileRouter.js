const router = require('express').Router()
const controller = require('../controllers/fileController')
const auth = require('../middleware/auth')

router.use(auth.authenticate)
router.post('/resume', controller.uploadResume)
router.post('/avatar', controller.uploadProfilePicture)

module.exports = router

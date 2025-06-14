const router = require('express').Router()
const controller = require('../controllers/feedController')
const auth = require('../middleware/auth')

router.use(auth.authenticate)
router.post('/', controller.createPost)
router.get('/', controller.getFeed)
router.post('/:id/like', controller.likePost)
router.post('/:id/comment', controller.addComment)

module.exports = router

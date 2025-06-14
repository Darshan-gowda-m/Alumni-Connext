const router = require('express').Router()
const controller = require('../controllers/connectionController')
const auth = require('../middleware/auth')

router.use(auth.authenticate)
router.post('/request', controller.sendRequest)
router.put('/request/:id', controller.respondToRequest)
router.get('/requests', controller.getPendingRequests)

module.exports = router

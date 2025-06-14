const ConnectionRequest = require('../models/ConnectionRequest.model')
const User = require('../models/User.model')

module.exports = {
  sendRequest: async (req, res) => {
    const request = await ConnectionRequest.create({
      sender: req.user.id,
      receiver: req.body.receiverId,
      message: req.body.message,
    })
    res.status(201).json(request)
  },

  respondToRequest: async (req, res) => {
    const request = await ConnectionRequest.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )

    if (req.body.status === 'accepted') {
      await User.findByIdAndUpdate(request.sender, {
        $addToSet: { connections: request.receiver },
      })
      await User.findByIdAndUpdate(request.receiver, {
        $addToSet: { connections: request.sender },
      })
    }

    res.json(request)
  },

  getPendingRequests: async (req, res) => {
    const requests = await ConnectionRequest.find({
      receiver: req.user.id,
      status: 'pending',
    }).populate('sender', 'name avatarUrl')
    res.json(requests)
  },
}

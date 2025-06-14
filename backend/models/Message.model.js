const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      index: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: String,
    read: { type: Boolean, default: false },
    conversationId: { type: String, index: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Message', messageSchema)

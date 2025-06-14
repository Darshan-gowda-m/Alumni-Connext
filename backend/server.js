const express = require('express')
const dotenv = require('dotenv')
const debug = require('debug')('app:server')
const path = require('path')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const routes = require('./routes/index')
const http = require('http')
const socketIo = require('socket.io')
const Message = require('./models/Message.model')
const Conversation = require('./models/Conversation.model')

// Load environment variables
dotenv.config()
debug('🌍 Environment variables loaded')
console.log('🌍 Environment variables loaded')

const app = express()
const PORT = process.env.PORT || 5000

// Connect to database
debug('🔗 Connecting to MongoDB...')
console.log('🔗 Connecting to MongoDB...')
connectDB().then(async () => {
  const db = mongoose.connection
  const collections = await db.db.listCollections().toArray()
  console.log(`✅ MongoDB Connected: ${db.host}`)
  console.log(`📊 Database Name: ${db.name}`)
  console.log(`🔌 Port: ${db.port || 27017}`)
  console.log(`📚 Collections (${collections.length}):`)
  collections.forEach((col, i) => {
    console.log(`   ${i + 1}. ${col.name}`)
  })

  debug(`✅ MongoDB Connected: ${db.host}`)
  debug(`📊 Database Name: ${db.name}`)
  debug(`📚 Collections count: ${collections.length}`)
})

// Middlewares
app.use(express.json())
debug('📦 JSON parsing enabled')
console.log('📦 JSON parsing enabled')

// Create HTTP server
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

// Socket.IO real-time communication
io.on('connection', (socket) => {
  debug(`⚡ New client connected: ${socket.id}`)
  console.log(`⚡ New client connected: ${socket.id}`)

  socket.on('join', (userId) => {
    socket.join(userId)
    debug(`👤 User ${userId} joined room`)
  })

  socket.on('sendMessage', async (messageData) => {
    debug(`📨 sendMessage called`)
    try {
      const message = await Message.create(messageData)
      debug(`💬 Message saved: ${message._id}`)

      io.to(messageData.recipient).emit('newMessage', message)
      debug(`📤 Message sent to ${messageData.recipient}`)

      await Conversation.findByIdAndUpdate(message.conversationId, {
        lastMessage: message.content,
        lastUpdated: Date.now(),
      })
      debug(`📝 Conversation updated`)
    } catch (err) {
      debug(`❌ Message error: ${err.message}`)
    }
  })

  socket.on('likePost', async ({ postId, userId }) => {
    try {
      io.emit('postLiked', { postId, userId })
      debug(`👍 Like broadcasted for post ${postId}`)
    } catch (err) {
      debug(`❌ Like error: ${err.message}`)
    }
  })

  socket.on('disconnect', () => {
    debug(`🔌 Client disconnected: ${socket.id}`)
    console.log(`🔌 Client disconnected: ${socket.id}`)
  })
})

// Routes
app.use('/api', routes)
debug('🛣️ API routes mounted at /api')
console.log('🛣️ API routes mounted at /api')

// Static uploads
app.use('/uploads', express.static('uploads'))
debug('📁 Static upload route active')
console.log('📁 Static upload route active')

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/build')
  app.use(express.static(frontendPath))

  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'))
  })

  debug('🎨 React build served from frontend/build')
  console.log('🎨 React build served from frontend/build')
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
  debug('🔗 Development root path active')
  console.log('🔗 Development root path active')
}

// Start server
server.listen(PORT, () => {
  debug(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode`)
  debug(`👂 Listening on http://localhost:${PORT}`)
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV || 'development'} mode`
  )
  console.log(`👂 Listening on http://localhost:${PORT}`)
})

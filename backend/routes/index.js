const express = require('express')
const router = express.Router()
const debug = require('debug')('app:routes')

// Import all route modules
const authRoutes = require('./authRoutes')
const eventRoutes = require('./eventRoutes')
const jobRoutes = require('./jobRoutes')
const leaderboardRoutes = require('./leaderboardRoutes')
const mentorshipRoutes = require('./mentorshipRoutes')
const messageRoutes = require('./messageRoutes')
const searchRoutes = require('./searchRoutes')
const skillGapRoutes = require('./skillGapRoutes')
const studentRoutes = require('./studentRoutes')
const achievementRoutes = require('./achievementRoutes')
const adminRoutes = require('./adminRoutes')
const alumniRoutes = require('./alumniRoutes')
const analyticsRoutes = require('./analyticsRoutes')
const connectionRoutes = require('./connectionRouter')
const fileRoutes = require('./fileRouter')
const feedRoutes = require('./feedRouter')

// Mount each route and log it
debug('📌 Mounting /auth')
router.use('/auth', authRoutes)

debug('📌 Mounting /events')
router.use('/events', eventRoutes)

debug('📌 Mounting /jobs')
router.use('/jobs', jobRoutes)

debug('📌 Mounting /leaderboard')
router.use('/leaderboard', leaderboardRoutes)

debug('📌 Mounting /mentorships')
router.use('/mentorships', mentorshipRoutes)

debug('📌 Mounting /messages')
router.use('/messages', messageRoutes)

debug('📌 Mounting /search')
router.use('/search', searchRoutes)

debug('📌 Mounting /skill-gaps')
router.use('/skill-gaps', skillGapRoutes)

debug('📌 Mounting /students')
router.use('/students', studentRoutes)

debug('📌 Mounting /achievements')
router.use('/achievements', achievementRoutes)

debug('📌 Mounting /admin')
router.use('/admin', adminRoutes)

debug('📌 Mounting /alumni')
router.use('/alumni', alumniRoutes)

debug('📌 Mounting /analytics')
router.use('/analytics', analyticsRoutes)

debug('📌 Mounting /connections')
router.use('/connections', connectionRoutes)

debug('📌 Mounting /upload')
router.use('/upload', fileRoutes)

debug('📌 Mounting /feed')
router.use('/feed', feedRoutes)

module.exports = router

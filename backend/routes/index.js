const express = require('express')
const router = express.Router()

const safeUse = (path, routeFile) => {
  try {
    console.log(`✅ Mounting route: ${path}`)
    router.use(path, require(routeFile))
  } catch (err) {
    console.error(`❌ Error mounting ${path}:`, err.message)
    throw err // rethrow so server still crashes, but now you know where
  }
}

safeUse('/auth', './authRoutes')
safeUse('/jobs', './jobRoutes')
safeUse('/events', './eventRoutes')
safeUse('/mentorship', './mentorshipRoutes')
safeUse('/messages', './messageRoutes')
safeUse('/feed', './feedRouter')
safeUse('/search', './searchRoutes')
safeUse('/connections', './connectionRoutes')
safeUse('/analytics', './analyticsRoutes')
safeUse('/admin', './adminRoutes')
safeUse('/alumni', './alumniRoutes')
safeUse('/achievement', './achievementRoutes')
safeUse('/leaderboard', './leaderboardRoutes')
safeUse('/skill-gap', './skillGapRoutes')

module.exports = router

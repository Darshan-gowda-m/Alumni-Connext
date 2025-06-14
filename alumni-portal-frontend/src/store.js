import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice'
import eventReducer from './features/events/eventSlice'
import jobReducer from './features/jobs/jobSlice'
import mentorshipReducer from './features/mentorship/mentorshipSlice'
import messageReducer from './features/messages/messageSlice'
import analyticsReducer from './features/analytics/analyticsSlice'
import leaderboardReducer from './features/leaderboard/leaderboardSlice'
import userReducer from './features/user/userSlice'
import adminReducer from './features/admin/adminSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
    jobs: jobReducer,
    mentorship: mentorshipReducer,
    messages: messageReducer,
    analytics: analyticsReducer,
    leaderboard: leaderboardReducer,
    user: userReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

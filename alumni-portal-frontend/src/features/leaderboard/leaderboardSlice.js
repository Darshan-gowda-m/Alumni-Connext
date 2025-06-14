import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  leaderboards: {
    daily: null,
    weekly: null,
    monthly: null,
    allTime: null,
  },
  currentPeriod: 'weekly',
  status: 'idle',
  error: null,
}

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setLeaderboard: (state, action) => {
      const { period, data } = action.payload
      state.leaderboards[period] = data
      state.status = 'succeeded'
    },
    setCurrentPeriod: (state, action) => {
      state.currentPeriod = action.payload
    },
    setLoading: (state) => {
      state.status = 'loading'
    },
    setError: (state, action) => {
      state.error = action.payload
      state.status = 'failed'
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  setLeaderboard,
  setCurrentPeriod,
  setLoading,
  setError,
  clearError,
} = leaderboardSlice.actions

export default leaderboardSlice.reducer

export const selectCurrentLeaderboard = (state) =>
  state.leaderboard.leaderboards[state.leaderboard.currentPeriod] || {
    rankings: [],
  }

export const selectLeaderboardPeriod = (state) =>
  state.leaderboard.currentPeriod
export const selectLeaderboardStatus = (state) => state.leaderboard.status
export const selectLeaderboardError = (state) => state.leaderboard.error

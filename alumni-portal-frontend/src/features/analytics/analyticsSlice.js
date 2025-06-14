import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  skillGaps: [],
  engagement: [],
  placement: [],
  status: 'idle',
  error: null,
}

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setSkillGaps: (state, action) => {
      state.skillGaps = action.payload
      state.status = 'succeeded'
    },
    setEngagement: (state, action) => {
      state.engagement = action.payload
    },
    setPlacement: (state, action) => {
      state.placement = action.payload
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
  setSkillGaps,
  setEngagement,
  setPlacement,
  setLoading,
  setError,
  clearError,
} = analyticsSlice.actions

export default analyticsSlice.reducer

export const selectSkillGaps = (state) => state.analytics.skillGaps
export const selectEngagement = (state) => state.analytics.engagement
export const selectPlacement = (state) => state.analytics.placement
export const selectAnalyticsStatus = (state) => state.analytics.status
export const selectAnalyticsError = (state) => state.analytics.error

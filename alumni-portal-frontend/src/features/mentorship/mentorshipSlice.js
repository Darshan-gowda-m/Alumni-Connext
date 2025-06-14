import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  requests: [],
  activeMentorships: [],
  status: 'idle',
  error: null,
}

const mentorshipSlice = createSlice({
  name: 'mentorship',
  initialState,
  reducers: {
    setRequests: (state, action) => {
      state.requests = action.payload
      state.status = 'succeeded'
    },
    addRequest: (state, action) => {
      state.requests.push(action.payload)
    },
    updateRequest: (state, action) => {
      const index = state.requests.findIndex(
        (r) => r._id === action.payload._id
      )
      if (index !== -1) {
        state.requests[index] = action.payload
      }
    },
    setActiveMentorships: (state, action) => {
      state.activeMentorships = action.payload
    },
    addSession: (state, action) => {
      const { mentorshipId, session } = action.payload
      const mentorship = state.activeMentorships.find(
        (m) => m._id === mentorshipId
      )
      if (mentorship) {
        mentorship.sessions.push(session)
      }
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
  setRequests,
  addRequest,
  updateRequest,
  setActiveMentorships,
  addSession,
  setLoading,
  setError,
  clearError,
} = mentorshipSlice.actions

export default mentorshipSlice.reducer

export const selectMentorshipRequests = (state) => state.mentorship.requests
export const selectActiveMentorships = (state) =>
  state.mentorship.activeMentorships
export const selectMentorshipStatus = (state) => state.mentorship.status
export const selectMentorshipError = (state) => state.mentorship.error

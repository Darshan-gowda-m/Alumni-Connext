import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  events: [],
  status: 'idle',
  error: null,
}

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload
      state.status = 'succeeded'
    },
    addEvent: (state, action) => {
      state.events.push(action.payload)
    },
    updateEvent: (state, action) => {
      const index = state.events.findIndex((e) => e._id === action.payload._id)
      if (index !== -1) {
        state.events[index] = action.payload
      }
    },
    removeEvent: (state, action) => {
      state.events = state.events.filter((e) => e._id !== action.payload)
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
  setEvents,
  addEvent,
  updateEvent,
  removeEvent,
  setLoading,
  setError,
  clearError,
} = eventSlice.actions

export default eventSlice.reducer

export const selectAllEvents = (state) => state.events.events
export const selectEventStatus = (state) => state.events.status
export const selectEventError = (state) => state.events.error

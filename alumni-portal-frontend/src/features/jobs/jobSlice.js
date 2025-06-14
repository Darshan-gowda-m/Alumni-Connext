import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  jobs: [],
  status: 'idle',
  error: null,
}

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload
      state.status = 'succeeded'
    },
    addJob: (state, action) => {
      state.jobs.push(action.payload)
    },
    updateJob: (state, action) => {
      const index = state.jobs.findIndex((j) => j._id === action.payload._id)
      if (index !== -1) {
        state.jobs[index] = action.payload
      }
    },
    removeJob: (state, action) => {
      state.jobs = state.jobs.filter((j) => j._id !== action.payload)
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
  setJobs,
  addJob,
  updateJob,
  removeJob,
  setLoading,
  setError,
  clearError,
} = jobSlice.actions

export default jobSlice.reducer

export const selectAllJobs = (state) => state.jobs.jobs
export const selectJobStatus = (state) => state.jobs.status
export const selectJobError = (state) => state.jobs.error

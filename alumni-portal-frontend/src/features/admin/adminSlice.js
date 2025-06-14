import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
  unverifiedUsers: [],
  universityStats: null,
  status: 'idle',
  error: null,
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload
      state.status = 'succeeded'
    },
    setUnverifiedUsers: (state, action) => {
      state.unverifiedUsers = action.payload
    },
    setUniversityStats: (state, action) => {
      state.universityStats = action.payload
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex((u) => u._id === action.payload._id)
      if (index !== -1) {
        state.users[index] = action.payload
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
  setUsers,
  setUnverifiedUsers,
  setUniversityStats,
  updateUser,
  setLoading,
  setError,
  clearError,
} = adminSlice.actions

export default adminSlice.reducer

export const selectAdminUsers = (state) => state.admin.users
export const selectUnverifiedUsers = (state) => state.admin.unverifiedUsers
export const selectUniversityStats = (state) => state.admin.universityStats
export const selectAdminStatus = (state) => state.admin.status
export const selectAdminError = (state) => state.admin.error

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
  searchResults: [],
  status: 'idle',
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload
      state.status = 'succeeded'
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload
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
  setSearchResults,
  updateUser,
  setLoading,
  setError,
  clearError,
} = userSlice.actions

export default userSlice.reducer

export const selectAllUsers = (state) => state.user.users
export const selectSearchResults = (state) => state.user.searchResults
export const selectUserStatus = (state) => state.user.status
export const selectUserError = (state) => state.user.error

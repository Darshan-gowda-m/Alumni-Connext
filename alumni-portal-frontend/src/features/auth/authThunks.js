import { login, register, getProfile, updateProfile } from '../../api/auth'
import { setCredentials, logout, updateUser } from './authSlice'
import { storeToken, clearToken } from '../../utils/auth'

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await register(userData)
    dispatch(
      setCredentials({
        user: response.user,
        token: response.token,
      })
    )
    storeToken(response.token)
    return response
  } catch (error) {
    throw error
  }
}

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await login(credentials)
    dispatch(
      setCredentials({
        user: response.user,
        token: response.token,
      })
    )
    storeToken(response.token)
    return response
  } catch (error) {
    throw error
  }
}

export const logoutUser = () => (dispatch) => {
  dispatch(logout())
  clearToken()
}

export const fetchUserProfile = () => async (dispatch, getState) => {
  try {
    const token = getState().auth.token
    if (!token) return

    const user = await getProfile()
    dispatch(updateUser(user))
    return user
  } catch (error) {
    throw error
  }
}

export const updateUserProfile =
  (profileData) => async (dispatch, getState) => {
    try {
      const token = getState().auth.token
      if (!token) return

      const updatedUser = await updateProfile(profileData)
      dispatch(updateUser(updatedUser))
      return updatedUser
    } catch (error) {
      throw error
    }
  }

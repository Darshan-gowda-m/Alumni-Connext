import {
  searchAlumni,
  getUserById,
  getConnections,
  sendConnectionRequest,
  getAchievements,
  getBatchmates,
} from '../../api/user'
import {
  setUsers,
  setSearchResults,
  updateUser,
  setLoading,
  setError,
} from './userSlice'

export const searchAlumniUsers = (filters) => async (dispatch) => {
  try {
    const results = await searchAlumni(filters)
    dispatch(setSearchResults(results))
    return results
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const fetchUserById = (userId) => async (dispatch) => {
  try {
    const user = await getUserById(userId)
    return user
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const fetchConnections = (userId) => async (dispatch) => {
  try {
    return await getConnections(userId)
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const sendConnection = (userId) => async (dispatch) => {
  try {
    const connection = await sendConnectionRequest(userId)
    return connection
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const fetchAchievements = (userId) => async (dispatch) => {
  try {
    return await getAchievements(userId)
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const fetchBatchmates = () => async (dispatch) => {
  try {
    const batchmates = await getBatchmates()
    return batchmates
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

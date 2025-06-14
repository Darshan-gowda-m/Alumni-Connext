import {
  getAllUsers,
  verifyUser,
  createUniversity,
  manageUser,
  getSkillGapReport,
  getUnverifiedUsers,
  getUniversityStats,
} from '../../api/admin'
import {
  setUsers,
  setUnverifiedUsers,
  setUniversityStats,
  updateUser,
  setLoading,
  setError,
} from './adminSlice'

export const fetchAllUsers = (filters) => async (dispatch) => {
  try {
    dispatch(setLoading())
    const users = await getAllUsers(filters)
    dispatch(setUsers(users))
    return users
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const verifyUserAccount = (userId) => async (dispatch) => {
  try {
    const user = await verifyUser(userId)
    dispatch(updateUser(user))
    return user
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const createNewUniversity = (universityData) => async (dispatch) => {
  try {
    const university = await createUniversity(universityData)
    return university
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const manageUserAccount = (userId, userData) => async (dispatch) => {
  try {
    const user = await manageUser(userId, userData)
    dispatch(updateUser(user))
    return user
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const fetchSkillGapReport = () => async (dispatch) => {
  try {
    const report = await getSkillGapReport()
    return report
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const fetchUnverifiedUsers = () => async (dispatch) => {
  try {
    const users = await getUnverifiedUsers()
    dispatch(setUnverifiedUsers(users))
    return users
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const fetchUniversityStats = () => async (dispatch) => {
  try {
    const stats = await getUniversityStats()
    dispatch(setUniversityStats(stats))
    return stats
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

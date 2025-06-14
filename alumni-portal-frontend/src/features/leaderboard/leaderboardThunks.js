import {
  getLeaderboard,
  recalculateLeaderboards,
  getUserRanking,
  updateUserScore,
} from '../../api/leaderboard'
import { setLeaderboard, setLoading, setError } from './leaderboardSlice'

export const fetchLeaderboard = (period) => async (dispatch) => {
  try {
    dispatch(setLoading())
    const data = await getLeaderboard(period)
    dispatch(setLeaderboard({ period, data }))
    return data
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const recalculateAllLeaderboards = () => async (dispatch) => {
  try {
    dispatch(setLoading())
    await recalculateLeaderboards()

    // Refetch all leaderboards after recalculation
    const periods = ['daily', 'weekly', 'monthly', 'allTime']
    for (const period of periods) {
      const data = await getLeaderboard(period)
      dispatch(setLeaderboard({ period, data }))
    }
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const fetchUserRanking = (userId) => async (dispatch) => {
  try {
    return await getUserRanking(userId)
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const updateUserLeaderboardScore =
  (userId, scoreData) => async (dispatch) => {
    try {
      const updatedScore = await updateUserScore(userId, scoreData)

      // Refetch current leaderboard
      const period = selectLeaderboardPeriod()
      const data = await getLeaderboard(period)
      dispatch(setLeaderboard({ period, data }))

      return updatedScore
    } catch (error) {
      dispatch(setError(error.message))
      throw error
    }
  }

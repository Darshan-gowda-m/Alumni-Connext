import {
  getDashboardData,
  exportAnalytics,
  calculateSkillGaps,
  getUserEngagement,
  getPlacementStats,
} from '../../api/analytics'
import {
  setSkillGaps,
  setEngagement,
  setPlacement,
  setLoading,
  setError,
} from './analyticsSlice'

export const fetchDashboardData = () => async (dispatch) => {
  try {
    dispatch(setLoading())
    const data = await getDashboardData()

    if (data.skillGaps) {
      dispatch(setSkillGaps(data.skillGaps))
    }

    if (data.engagement) {
      dispatch(setEngagement(data.engagement))
    }

    if (data.placement) {
      dispatch(setPlacement(data.placement))
    }

    return data
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const exportAnalyticsData = (type) => async (dispatch) => {
  try {
    return await exportAnalytics(type)
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const calculateSkillGapsData = () => async (dispatch) => {
  try {
    dispatch(setLoading())
    const skillGaps = await calculateSkillGaps()
    dispatch(setSkillGaps(skillGaps))
    return skillGaps
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const fetchUserEngagement = (period) => async (dispatch) => {
  try {
    const engagement = await getUserEngagement(period)
    dispatch(setEngagement(engagement))
    return engagement
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const fetchPlacementStats = () => async (dispatch) => {
  try {
    const placement = await getPlacementStats()
    dispatch(setPlacement(placement))
    return placement
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

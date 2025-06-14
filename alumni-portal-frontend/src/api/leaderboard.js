import axios from 'axios'
import { API_URL } from '../config';
import { getToken } from '../utils/auth'



export const getLeaderboard = async (period = 'weekly') => {
  const token = getToken()
  const response = await axios.get(`${API_URL}/leaderboard?period=${period}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const recalculateLeaderboards = async () => {
  const token = getToken()
  const response = await axios.post(
    `${API_URL}/leaderboard/recalculate`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}

export const getUserRanking = async (userId) => {
  const token = getToken()
  const response = await axios.get(`${API_URL}/leaderboard/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const updateUserScore = async (userId, scoreData) => {
  const token = getToken()
  const response = await axios.put(
    `${API_URL}/leaderboard/user/${userId}/score`,
    scoreData,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}

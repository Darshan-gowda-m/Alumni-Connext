import axios from 'axios'
import { API_URL } from '../config';
import { getToken } from '../utils/auth'


export const getDashboardData = async () => {
  const token = getToken()
  const response = await axios.get(`${API_URL}/analytics`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const exportAnalytics = async (type) => {
  const token = getToken()
  const response = await axios.get(`${API_URL}/analytics/export/${type}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'text/csv',
    },
    responseType: 'blob',
  })
  return response.data
}

export const calculateSkillGaps = async () => {
  const token = getToken()
  const response = await axios.post(
    `${API_URL}/analytics/skill-gaps`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}

export const getUserEngagement = async (period) => {
  const token = getToken()
  const response = await axios.get(
    `${API_URL}/analytics/engagement?period=${period}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return response.data
}

export const getPlacementStats = async () => {
  const token = getToken()
  const response = await axios.get(`${API_URL}/analytics/placement`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

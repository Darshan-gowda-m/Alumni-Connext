import axios from 'axios'
import { API_URL } from '../config';
import { getToken } from '../utils/auth'



export const searchAlumni = async (filters) => {
  const token = getToken()
  const response = await axios.get(`${API_URL}/users/search/alumni`, {
    params: filters,
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const getUserById = async (userId) => {
  const token = getToken()
  const response = await axios.get(`${API_URL}/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const getConnections = async (userId) => {
  const token = getToken()
  const response = await axios.get(`${API_URL}/users/${userId}/connections`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const sendConnectionRequest = async (userId) => {
  const token = getToken()
  const response = await axios.post(
    `${API_URL}/users/${userId}/connect`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}

export const getAchievements = async (userId) => {
  const token = getToken()
  const response = await axios.get(`${API_URL}/users/${userId}/achievements`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const getBatchmates = async () => {
  const token = getToken()
  const response = await axios.get(`${API_URL}/users/batchmates`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

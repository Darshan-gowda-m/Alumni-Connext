import axios from 'axios'
import { API_URL } from '../config';
import { getToken } from '../utils/auth'


export const getAllUsers = async (filters = {}) => {
  const token = getToken()
  const response = await axios.get(`${API_URL}/admin/users`, {
    params: filters,
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const verifyUser = async (userId) => {
  const token = getToken()
  const response = await axios.patch(
    `${API_URL}/admin/users/${userId}/verify`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}

export const createUniversity = async (universityData) => {
  const token = getToken()
  const response = await axios.post(
    `${API_URL}/admin/universities`,
    universityData,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}

export const manageUser = async (userId, userData) => {
  const token = getToken()
  const response = await axios.put(
    `${API_URL}/admin/users/${userId}`,
    userData,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}

export const getSkillGapReport = async () => {
  const token = getToken()
  const response = await axios.get(`${API_URL}/admin/skill-gap-report`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const getUnverifiedUsers = async () => {
  const token = getToken()
  const response = await axios.get(`${API_URL}/admin/users/unverified`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const getUniversityStats = async () => {
  const token = getToken()
  const response = await axios.get(`${API_URL}/admin/university-stats`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

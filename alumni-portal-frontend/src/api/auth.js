import axios from 'axios'
import { API_URL } from '../config';
import { storeToken, getToken } from '../utils/auth'



export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData)
  if (response.data.token) {
    storeToken(response.data.token)
  }
  return response.data
}

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials)
  if (response.data.token) {
    storeToken(response.data.token)
  }
  return response.data
}

export const getProfile = async () => {
  const token = getToken()
  const response = await axios.get(`${API_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const updateProfile = async (profileData) => {
  const token = getToken()
  const response = await axios.put(`${API_URL}/auth/profile`, profileData, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

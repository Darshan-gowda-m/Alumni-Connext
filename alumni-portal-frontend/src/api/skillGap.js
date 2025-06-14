import axios from 'axios'
import { API_URL } from '../config';
import { getToken } from '../utils/auth'


export const getSkillGaps = async () => {
  const token = getToken()
  const response = await axios.get(`${API_URL}/skill-gaps`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const getTopSkillGaps = async (limit = 10) => {
  const token = getToken()
  const response = await axios.get(`${API_URL}/skill-gaps/top?limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const getSkillDetails = async (skillName) => {
  const token = getToken()
  const response = await axios.get(
    `${API_URL}/skill-gaps/${encodeURIComponent(skillName)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return response.data
}

export const getSkillResources = async (skillName) => {
  const token = getToken()
  const response = await axios.get(
    `${API_URL}/skill-gaps/${encodeURIComponent(skillName)}/resources`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}

export const addSkillResource = async (skillName, resourceData) => {
  const token = getToken()
  const response = await axios.post(
    `${API_URL}/skill-gaps/${encodeURIComponent(skillName)}/resources`,
    resourceData,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}

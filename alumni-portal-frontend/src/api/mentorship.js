import axios from 'axios'
import { API_URL } from '../config';
import { getToken } from '../utils/auth'



export const sendMentorshipRequest = async (requestData) => {
  const token = getToken()
  const response = await axios.post(
    `${API_URL}/mentorship/request`,
    requestData,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}

export const getMentorshipRequests = async () => {
  const token = getToken()
  const response = await axios.get(`${API_URL}/mentorship/requests`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const respondToMentorship = async (requestId, status) => {
  const token = getToken()
  const response = await axios.put(
    `${API_URL}/mentorship/${requestId}/respond`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}

export const scheduleSession = async (mentorshipId, sessionData) => {
  const token = getToken()
  const response = await axios.post(
    `${API_URL}/mentorship/${mentorshipId}/sessions`,
    sessionData,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}

export const endMentorship = async (mentorshipId) => {
  const token = getToken()
  const response = await axios.put(
    `${API_URL}/mentorship/${mentorshipId}/end`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}

export const rateMentorship = async (mentorshipId, rating) => {
  const token = getToken()
  const response = await axios.post(
    `${API_URL}/mentorship/${mentorshipId}/rate`,
    { rating },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}

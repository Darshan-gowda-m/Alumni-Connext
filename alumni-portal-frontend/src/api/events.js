import axios from 'axios'
import { API_URL } from '../config';
import { getToken } from '../utils/auth'



export const createEvent = async (eventData) => {
  const token = getToken()
  const response = await axios.post(`${API_URL}/events`, eventData, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const getEvents = async () => {
  const token = getToken()
  const response = await axios.get(`${API_URL}/events`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const rsvpEvent = async (eventId, status) => {
  const token = getToken()
  const response = await axios.post(
    `${API_URL}/events/${eventId}/rsvp`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}

export const deleteEvent = async (eventId) => {
  const token = getToken()
  const response = await axios.delete(`${API_URL}/events/${eventId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

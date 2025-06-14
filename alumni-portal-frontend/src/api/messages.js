import axios from 'axios'
import { API_URL } from '../config';
import { getToken } from '../utils/auth'



export const createConversation = async (participantIds) => {
  const token = getToken()
  const response = await axios.post(
    `${API_URL}/messages/conversations`,
    { participants: participantIds },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}

export const getConversations = async () => {
  const token = getToken()
  const response = await axios.get(`${API_URL}/messages/conversations`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const getMessages = async (conversationId) => {
  const token = getToken()
  const response = await axios.get(
    `${API_URL}/messages/conversations/${conversationId}/messages`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}

export const sendMessage = async (conversationId, content) => {
  const token = getToken()
  const response = await axios.post(
    `${API_URL}/messages/conversations/${conversationId}/messages`,
    { content },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}

export const markAsRead = async (messageId) => {
  const token = getToken()
  const response = await axios.put(
    `${API_URL}/messages/${messageId}/read`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}

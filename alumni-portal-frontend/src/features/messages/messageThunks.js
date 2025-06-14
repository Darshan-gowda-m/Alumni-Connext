import {
  createConversation,
  getConversations,
  getMessages,
  sendMessage,
  markAsRead,
} from '../../api/messages'
import {
  setConversations,
  setActiveConversation,
  setMessages,
  addMessage,
  setLoading,
  setError,
} from './messageSlice'

export const startNewConversation = (participantIds) => async (dispatch) => {
  try {
    dispatch(setLoading())
    const conversation = await createConversation(participantIds)
    dispatch(setActiveConversation(conversation))
    return conversation
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const fetchConversations = () => async (dispatch) => {
  try {
    dispatch(setLoading())
    const conversations = await getConversations()
    dispatch(setConversations(conversations))
    return conversations
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const fetchMessages = (conversationId) => async (dispatch) => {
  try {
    const messages = await getMessages(conversationId)
    dispatch(setMessages(messages))
    return messages
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const sendNewMessage = (conversationId, content) => async (dispatch) => {
  try {
    const message = await sendMessage(conversationId, content)
    dispatch(addMessage(message))
    return message
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const markMessageAsRead = (messageId) => async (dispatch) => {
  try {
    await markAsRead(messageId)
    dispatch(markAsRead(messageId))
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

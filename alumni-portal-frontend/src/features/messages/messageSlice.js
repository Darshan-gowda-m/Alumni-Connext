import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  conversations: [],
  activeConversation: null,
  messages: [],
  status: 'idle',
  error: null,
}

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload
      state.status = 'succeeded'
    },
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload
    },
    setMessages: (state, action) => {
      state.messages = action.payload
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload)

      // Update conversation last message
      if (
        state.activeConversation &&
        state.activeConversation._id === action.payload.conversationId
      ) {
        state.activeConversation.lastMessage = action.payload.content
        state.activeConversation.lastUpdated = new Date().toISOString()
      }

      // Update conversations list
      const conversationIndex = state.conversations.findIndex(
        (c) => c._id === action.payload.conversationId
      )

      if (conversationIndex !== -1) {
        state.conversations[conversationIndex].lastMessage =
          action.payload.content
        state.conversations[conversationIndex].lastUpdated =
          new Date().toISOString()
      }
    },
    markAsRead: (state, action) => {
      const message = state.messages.find((m) => m._id === action.payload)
      if (message) {
        message.read = true
      }
    },
    setLoading: (state) => {
      state.status = 'loading'
    },
    setError: (state, action) => {
      state.error = action.payload
      state.status = 'failed'
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  setConversations,
  setActiveConversation,
  setMessages,
  addMessage,
  markAsRead,
  setLoading,
  setError,
  clearError,
} = messageSlice.actions

export default messageSlice.reducer

export const selectConversations = (state) => state.messages.conversations
export const selectActiveConversation = (state) =>
  state.messages.activeConversation
export const selectMessages = (state) => state.messages.messages
export const selectMessageStatus = (state) => state.messages.status
export const selectMessageError = (state) => state.messages.error

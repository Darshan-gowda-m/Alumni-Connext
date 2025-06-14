import { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  TextField,
  Button,
  Paper,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchConversations,
  fetchMessages,
  sendNewMessage,
  startNewConversation,
} from '../features/messages/messageThunks'
import { selectCurrentUser } from '../features/auth/authSlice'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import useSocket from '../hooks/useSocket'
import { formatDateTime } from '../utils/formatters'

const MessagesPage = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  const { conversations, activeConversation, messages, status } = useSelector(
    (state) => state.messages
  )
  const [messageContent, setMessageContent] = useState('')
  const [recipient, setRecipient] = useState('')

  // Setup socket for real-time messaging
  useSocket({
    newMessage: (message) => {
      if (
        activeConversation &&
        message.conversationId === activeConversation._id
      ) {
        dispatch({ type: 'messages/addMessage', payload: message })
      }
    },
  })

  useEffect(() => {
    if (user) {
      dispatch(fetchConversations())
    }
  }, [dispatch, user])

  useEffect(() => {
    if (activeConversation) {
      dispatch(fetchMessages(activeConversation._id))
    }
  }, [dispatch, activeConversation])

  const handleSelectConversation = (conversation) => {
    dispatch({ type: 'messages/setActiveConversation', payload: conversation })
  }

  const handleSendMessage = async () => {
    if (!messageContent.trim() || !activeConversation) return

    try {
      const otherParticipant = activeConversation.participants.find(
        (p) => p._id !== user._id
      )
      await dispatch(sendNewMessage(activeConversation._id, messageContent))
      setMessageContent('')
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  const handleStartConversation = async () => {
    if (!recipient.trim()) return

    try {
      // This would normally be a user ID search, simplified here
      const newConversation = await dispatch(
        startNewConversation([user._id, recipient])
      ).unwrap()
      dispatch({
        type: 'messages/setActiveConversation',
        payload: newConversation,
      })
      setRecipient('')
    } catch (error) {
      console.error('Failed to start conversation:', error)
    }
  }

  return (
    <Box sx={{ p: 3, height: 'calc(100vh - 64px)' }}>
      <Typography variant="h4" gutterBottom>
        Messages
      </Typography>

      <Grid container sx={{ height: '100%' }}>
        <Grid
          item
          xs={4}
          sx={{
            borderRight: '1px solid #ddd',
            height: '100%',
            overflowY: 'auto',
          }}
        >
          <Box sx={{ p: 2, borderBottom: '1px solid #ddd' }}>
            <TextField
              fullWidth
              label="Start conversation with user ID"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              sx={{ mb: 1 }}
            />
            <Button
              variant="contained"
              onClick={handleStartConversation}
              disabled={!recipient.trim()}
            >
              Start Chat
            </Button>
          </Box>

          <List>
            {conversations.map((conversation) => {
              const otherUser = conversation.participants.find(
                (p) => p._id !== user._id
              )

              return (
                <ListItem
                  button
                  key={conversation._id}
                  selected={activeConversation?._id === conversation._id}
                  onClick={() => handleSelectConversation(conversation)}
                  sx={{ borderBottom: '1px solid #eee' }}
                >
                  <ListItemAvatar>
                    <Avatar alt={otherUser?.name} src={otherUser?.avatarUrl} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={otherUser?.name}
                    secondary={
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '200px',
                          }}
                        >
                          {conversation.lastMessage}
                        </Typography>
                        <Typography variant="caption">
                          {formatDateTime(conversation.lastUpdated)}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              )
            })}
          </List>
        </Grid>

        <Grid
          item
          xs={8}
          sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          {activeConversation ? (
            <>
              <Box
                sx={{
                  p: 2,
                  borderBottom: '1px solid #ddd',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  alt={
                    activeConversation.participants.find(
                      (p) => p._id !== user._id
                    )?.name
                  }
                  src={
                    activeConversation.participants.find(
                      (p) => p._id !== user._id
                    )?.avatarUrl
                  }
                  sx={{ mr: 2 }}
                />
                <Typography variant="h6">
                  {
                    activeConversation.participants.find(
                      (p) => p._id !== user._id
                    )?.name
                  }
                </Typography>
              </Box>

              <Box
                sx={{
                  flexGrow: 1,
                  overflowY: 'auto',
                  p: 2,
                  bgcolor: '#f9f9f9',
                }}
              >
                {messages.map((message) => (
                  <Box
                    key={message._id}
                    sx={{
                      mb: 2,
                      display: 'flex',
                      justifyContent:
                        message.sender === user._id ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: '70%',
                        bgcolor:
                          message.sender === user._id ? '#e3f2fd' : '#fff',
                        borderRadius: '18px',
                        p: 2,
                        boxShadow: 1,
                      }}
                    >
                      <Typography>{message.content}</Typography>
                      <Typography
                        variant="caption"
                        sx={{ display: 'block', textAlign: 'right' }}
                      >
                        {formatDateTime(message.createdAt)}
                      </Typography>
                    </Box>
                  </Box>
                ))}
                {messages.length === 0 && status === 'succeeded' && (
                  <Typography
                    align="center"
                    sx={{ mt: 4, color: 'text.secondary' }}
                  >
                    No messages yet. Start the conversation!
                  </Typography>
                )}
              </Box>

              <Box sx={{ p: 2, borderTop: '1px solid #ddd' }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type a message"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  sx={{ mb: 1 }}
                />
                <Button
                  variant="contained"
                  onClick={handleSendMessage}
                  disabled={!messageContent.trim()}
                >
                  Send
                </Button>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                color: 'text.secondary',
              }}
            >
              <Typography>Select a conversation to start messaging</Typography>
            </Box>
          )}
        </Grid>
      </Grid>

      {status === 'loading' && <LoadingSpinner />}
    </Box>
  )
}

export default MessagesPage

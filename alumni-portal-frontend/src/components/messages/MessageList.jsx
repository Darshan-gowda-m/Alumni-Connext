import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  Typography,
  Box,
} from '@mui/material'
import { formatDateTime } from '../../utils/formatters'

const MessageList = ({ messages, userId }) => {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {messages.map((message) => (
        <ListItem
          key={message._id}
          alignItems="flex-start"
          sx={{
            justifyContent:
              message.sender === userId ? 'flex-end' : 'flex-start',
          }}
        >
          {message.sender !== userId && (
            <ListItemAvatar>
              <Avatar alt={message.senderName} src={message.senderAvatar} />
            </ListItemAvatar>
          )}

          <Box
            sx={{
              maxWidth: '70%',
              bgcolor: message.sender === userId ? '#e3f2fd' : '#f5f5f5',
              borderRadius: '18px',
              p: 2,
              ml: message.sender === userId ? 0 : 1,
              mr: message.sender === userId ? 1 : 0,
            }}
          >
            {message.sender !== userId && (
              <Typography variant="subtitle2" fontWeight="bold">
                {message.senderName}
              </Typography>
            )}
            <Typography variant="body1">{message.content}</Typography>
            <Typography
              variant="caption"
              display="block"
              sx={{ textAlign: 'right', mt: 1 }}
            >
              {formatDateTime(message.createdAt)}
            </Typography>
          </Box>

          {message.sender === userId && (
            <ListItemAvatar>
              <Avatar alt="You" src={message.senderAvatar} />
            </ListItemAvatar>
          )}
        </ListItem>
      ))}
    </List>
  )
}

export default MessageList

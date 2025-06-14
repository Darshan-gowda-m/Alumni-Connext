import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
} from '@mui/material'
import { Link } from 'react-router-dom'

const UserConnections = ({ connections }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Connections ({connections.length})
      </Typography>

      {connections.length > 0 ? (
        <List>
          {connections.map((connection) => (
            <ListItem
              key={connection._id}
              secondaryAction={
                <Button
                  component={Link}
                  to={`/messages?user=${connection._id}`}
                  size="small"
                >
                  Message
                </Button>
              }
            >
              <ListItemAvatar>
                <Avatar src={connection.avatarUrl} alt={connection.name} />
              </ListItemAvatar>
              <ListItemText
                primary={connection.name}
                secondary={`${connection.role} · ${connection.batch}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No connections yet. Start connecting with alumni and batchmates!
        </Typography>
      )}
    </Box>
  )
}

export default UserConnections

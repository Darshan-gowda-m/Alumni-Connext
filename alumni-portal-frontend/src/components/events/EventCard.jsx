import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Stack,
  Box,
} from '@mui/material'
import { formatDateTime } from '../../utils/formatters'
import { useNavigate } from 'react-router-dom'

const EventCard = ({ event }) => {
  const navigate = useNavigate()

  const handleRSVP = (e) => {
    e.stopPropagation()
    // Implement RSVP functionality
  }

  const handleDetails = () => {
    navigate(`/events/${event._id}`)
  }

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      }}
      onClick={handleDetails}
    >
      <CardMedia
        component="img"
        height="140"
        image={event.image || 'https://source.unsplash.com/random?event'}
        alt={event.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {event.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {formatDateTime(event.startDateTime)}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {event.location === 'online'
            ? 'Online Event'
            : event.venue || 'University Campus'}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip
            label={event.location}
            color={event.location === 'online' ? 'primary' : 'default'}
            size="small"
          />
          <Chip
            label={`${event.attendees.length} attending`}
            size="small"
            variant="outlined"
          />
        </Stack>
      </CardContent>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button size="small" variant="outlined" onClick={handleRSVP}>
          RSVP
        </Button>
        <Button size="small" onClick={handleDetails}>
          Details
        </Button>
      </Box>
    </Card>
  )
}

export default EventCard

import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Avatar,
  Stack,
  Chip,
} from '@mui/material'
import { format } from 'date-fns'

const MentorRequestCard = ({ request, onAccept, onReject, onSchedule }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar src={request.student.avatarUrl} sx={{ mr: 2 }} />
          <Box>
            <Typography variant="h6">{request.student.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {request.student.branch} · Batch {request.student.batch}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body1" sx={{ mb: 2 }}>
          {request.message}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip label={`Status: ${request.status}`} size="small" />
          <Chip
            label={`Requested: ${format(
              new Date(request.createdAt),
              'dd MMM yyyy'
            )}`}
            size="small"
            variant="outlined"
          />
        </Stack>

        {request.status === 'pending' && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => onAccept(request._id)}
            >
              Accept
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => onReject(request._id)}
            >
              Decline
            </Button>
          </Box>
        )}

        {request.status === 'accepted' && onSchedule && (
          <Button
            variant="contained"
            size="small"
            onClick={() => onSchedule(request._id)}
          >
            Schedule Session
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default MentorRequestCard

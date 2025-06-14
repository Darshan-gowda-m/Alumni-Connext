import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  Stack,
  Box,
  Chip,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const MentorConnection = ({ mentor, onRequest }) => {
  const navigate = useNavigate()

  const handleConnect = (e) => {
    e.stopPropagation()
    if (onRequest) onRequest(mentor._id)
  }

  const handleViewProfile = () => {
    navigate(`/profile/${mentor._id}`)
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar src={mentor.avatarUrl} sx={{ width: 80, height: 80 }} />
        </Box>

        <Typography variant="h6" align="center" gutterBottom>
          {mentor.name}
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          gutterBottom
        >
          {mentor.position} at {mentor.company}
        </Typography>

        <Typography variant="body2" align="center" sx={{ mb: 2 }}>
          Batch of {mentor.batch} · {mentor.branch}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{ justifyContent: 'center', mb: 2 }}
        >
          {mentor.skills?.slice(0, 3).map((skill, index) => (
            <Chip key={index} label={skill} size="small" />
          ))}
          {mentor.skills?.length > 3 && (
            <Chip label={`+${mentor.skills.length - 3}`} size="small" />
          )}
        </Stack>
      </CardContent>

      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-around' }}>
        <Button variant="outlined" size="small" onClick={handleViewProfile}>
          View Profile
        </Button>
        <Button variant="contained" size="small" onClick={handleConnect}>
          Request Mentorship
        </Button>
      </Box>
    </Card>
  )
}

export default MentorConnection

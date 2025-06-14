import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  Chip,
  Paper,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentLeaderboard as selectLeaderboard } from '../../features/leaderboard/leaderboardSlice';
import {  
  selectLeaderboardPeriod 
} from '../../features/leaderboard/leaderboardSlice';
const LeaderboardWidget = () => {
  const navigate = useNavigate()
  const { rankings } = useSelector(selectCurrentLeaderboard);
const period = useSelector(selectLeaderboardPeriod);
  const topRankings = rankings.slice(0, 5)

  const getMedalColor = (position) => {
    if (position === 1) return '#FFD700' // Gold
    if (position === 2) return '#C0C0C0' // Silver
    if (position === 3) return '#CD7F32' // Bronze
    return 'default'
  }

  const handleViewAll = () => {
    navigate('/leaderboard')
  }

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6">Leaderboard ({period})</Typography>
        <Chip label={`Top ${period}`} color="primary" size="small" />
      </Box>

      <List>
        {topRankings.map((user, index) => (
          <ListItem
            key={user._id}
            sx={{
              py: 1,
              backgroundColor: index < 3 ? '#f9f9f9' : 'transparent',
              borderLeft: `3px solid ${getMedalColor(index + 1)}`,
            }}
          >
            <ListItemAvatar>
              <Avatar src={user.avatarUrl} alt={user.name} />
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              secondary={`${user.score} points`}
            />
            <Chip
              label={`#${index + 1}`}
              size="small"
              color={index < 3 ? 'primary' : 'default'}
              sx={{
                backgroundColor: getMedalColor(index + 1),
                color: index < 3 ? '#fff' : 'inherit',
              }}
            />
          </ListItem>
        ))}
      </List>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
        <Button
          size="small"
          onClick={handleViewAll}
          sx={{ textTransform: 'none' }}
        >
          View Full Leaderboard
        </Button>
      </Box>
    </Paper>
  )
}

export default LeaderboardWidget

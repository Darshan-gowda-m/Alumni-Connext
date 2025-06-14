import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
} from '@mui/material'

const UserAchievements = ({ achievements }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Achievements ({achievements.length})
      </Typography>

      {achievements.length > 0 ? (
        <Grid container spacing={2}>
          {achievements.map((achievement) => (
            <Grid item xs={12} sm={6} md={4} key={achievement._id}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    achievement.icon ||
                    'https://source.unsplash.com/random?achievement'
                  }
                  alt={achievement.name}
                />
                <CardContent>
                  <Typography variant="h6">{achievement.name}</Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {achievement.description}
                  </Typography>
                  <Chip
                    label={`+${achievement.points} points`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    Unlocked:{' '}
                    {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No achievements yet. Complete activities to earn achievements!
        </Typography>
      )}
    </Box>
  )
}

export default UserAchievements

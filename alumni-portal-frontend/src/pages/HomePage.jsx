import { useEffect } from 'react'
import { Grid, Typography, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import EventCard from '../components/events/EventCard'
import JobCard from '../components/jobs/JobCard'
import LeaderboardWidget from '../components/leaderboard/LeaderboardWidget'
import { fetchEvents } from '../features/events/eventThunks'
import { fetchJobs } from '../features/jobs/jobThunks'
import { selectCurrentUser } from '../features/auth/authSlice'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const HomePage = () => {
  const dispatch = useDispatch()
  const { events, status: eventStatus } = useSelector((state) => state.events)
  const { jobs, status: jobStatus } = useSelector((state) => state.jobs)
  const user = useSelector(selectCurrentUser)

  useEffect(() => {
    dispatch(fetchEvents())
    dispatch(fetchJobs())
  }, [dispatch])

  if (eventStatus === 'loading' || jobStatus === 'loading') {
    return <LoadingSpinner fullScreen />
  }

  const upcomingEvents = events
    .filter((event) => new Date(event.startDateTime) > new Date())
    .slice(0, 3)

  const recentJobs = jobs.slice(0, 3)

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name}!
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom>
            Upcoming Events
          </Typography>
          {upcomingEvents.length > 0 ? (
            <Grid container spacing={2}>
              {upcomingEvents.map((event) => (
                <Grid item xs={12} sm={6} key={event._id}>
                  <EventCard event={event} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No upcoming events</Typography>
          )}

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Recent Job Postings
          </Typography>
          {recentJobs.length > 0 ? (
            <Grid container spacing={2}>
              {recentJobs.map((job) => (
                <Grid item xs={12} key={job._id}>
                  <JobCard job={job} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No job postings</Typography>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <LeaderboardWidget />
          <Box
            sx={{ mt: 3, p: 2, bgcolor: 'background.paper', borderRadius: 2 }}
          >
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <ul>
              <li>Update your profile</li>
              <li>Connect with alumni</li>
              <li>Apply for internships</li>
              <li>Attend upcoming events</li>
            </ul>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default HomePage

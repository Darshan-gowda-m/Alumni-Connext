import { useState, useEffect } from 'react'
import {
  Tabs,
  Tab,
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  TextField,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import MentorConnection from '../components/mentorship/MentorConnection'
import MentorRequestCard from '../components/mentorship/MentorRequestCard'
import SessionScheduler from '../components/mentorship/SessionScheduler'
import {
  fetchMentorshipRequests,
  createMentorshipRequest,
  respondToRequest,
  fetchActiveMentorships,
} from '../features/mentorship/mentorshipThunks'
import { searchAlumniUsers } from '../features/user/userThunks'
import { selectCurrentUser } from '../features/auth/authSlice'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const MentorshipPage = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  const { requests, activeMentorships, status } = useSelector(
    (state) => state.mentorship
  )
  const { searchResults } = useSelector((state) => state.user)
  const [activeTab, setActiveTab] = useState(0)
  const [showScheduler, setShowScheduler] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (user) {
      dispatch(fetchMentorshipRequests())
    }
  }, [dispatch, user])

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      dispatch(searchAlumniUsers({ q: searchQuery }))
    }
  }

  const handleRequestMentorship = (alumniId) => {
    dispatch(
      createMentorshipRequest({
        alumniId,
        message: `Hi, I'm ${user.name} from ${user.batch} batch. I'd like to request your mentorship.`,
      })
    )
  }

  const handleRespond = (requestId, status) => {
    dispatch(respondToRequest(requestId, status))
  }

  const userRequests = requests.filter(
    (r) => r.student === user?._id || r.alumni === user?._id
  )

  const pendingRequests = userRequests.filter((r) => r.status === 'pending')
  const activeRequests = userRequests.filter(
    (r) =>
      r.status === 'accepted' &&
      (!r.endDate || new Date(r.endDate) > new Date())
  )

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Mentorship Program
      </Typography>

      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Find a Mentor" />
        <Tab label="My Requests" />
        <Tab label="Active Mentorships" />
      </Tabs>

      {activeTab === 0 && (
        <Box>
          <Paper component="form" onSubmit={handleSearch} sx={{ p: 2, mb: 3 }}>
            <TextField
              fullWidth
              label="Search alumni by name, company, or skills"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Search
            </Button>
          </Paper>

          <Grid container spacing={3}>
            {searchResults.map((alumni) => (
              <Grid item xs={12} sm={6} md={4} key={alumni._id}>
                <MentorConnection
                  mentor={alumni}
                  onRequest={() => handleRequestMentorship(alumni._id)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {activeTab === 1 && (
        <Grid container spacing={3}>
          {pendingRequests.map((request) => (
            <Grid item xs={12} key={request._id}>
              <MentorRequestCard
                request={request}
                onAccept={() => handleRespond(request._id, 'accepted')}
                onReject={() => handleRespond(request._id, 'rejected')}
              />
            </Grid>
          ))}
          {pendingRequests.length === 0 && status === 'succeeded' && (
            <Grid item xs={12}>
              <Typography>No pending mentorship requests</Typography>
            </Grid>
          )}
        </Grid>
      )}

      {activeTab === 2 && (
        <Box>
          <Grid container spacing={3}>
            {activeRequests.map((request) => (
              <Grid item xs={12} key={request._id}>
                <MentorRequestCard
                  request={request}
                  showActions
                  onSchedule={() => {
                    setSelectedRequest(request)
                    setShowScheduler(true)
                  }}
                />
              </Grid>
            ))}
            {activeRequests.length === 0 && status === 'succeeded' && (
              <Grid item xs={12}>
                <Typography>No active mentorships</Typography>
              </Grid>
            )}
          </Grid>

          {showScheduler && selectedRequest && (
            <SessionScheduler
              mentorshipId={selectedRequest._id}
              open={showScheduler}
              onClose={() => setShowScheduler(false)}
              onSave={(sessionData) => {
                // Handle session saving
                setShowScheduler(false)
              }}
            />
          )}
        </Box>
      )}

      {status === 'loading' && <LoadingSpinner />}
    </Box>
  )
}

export default MentorshipPage

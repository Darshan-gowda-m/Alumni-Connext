import { useState, useEffect } from 'react'
import { Button, Grid, Typography, Tabs, Tab, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import EventCard from '../components/events/EventCard'
import EventForm from '../components/events/EventForm'
import { fetchEvents, createNewEvent } from '../features/events/eventThunks'
import { selectCurrentUser } from '../features/auth/authSlice'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const EventsPage = () => {
  const dispatch = useDispatch()
  const { events, status } = useSelector((state) => state.events)
  const user = useSelector(selectCurrentUser)
  const [activeTab, setActiveTab] = useState(0)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue)
  }

  const handleCreateEvent = async (eventData) => {
    try {
      await dispatch(createNewEvent(eventData)).unwrap()
      setShowForm(false)
    } catch (error) {
      console.error('Failed to create event:', error)
    }
  }

  const upcomingEvents = events.filter(
    (event) => new Date(event.startDateTime) > new Date()
  )

  const pastEvents = events.filter(
    (event) => new Date(event.startDateTime) <= new Date()
  )

  const userEvents = events.filter(
    (event) =>
      event.organizer === user?._id ||
      event.rsvp.some((r) => r.user === user?._id && r.status === 'attending')
  )

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Events</Typography>
        {(user?.role === 'admin' || user?.role === 'faculty') && (
          <Button variant="contained" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Create Event'}
          </Button>
        )}
      </Box>

      {showForm && (
        <EventForm
          onSubmit={handleCreateEvent}
          onCancel={() => setShowForm(false)}
        />
      )}

      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Upcoming" />
        <Tab label="Past" />
        <Tab label="My Events" />
      </Tabs>

      {status === 'loading' ? (
        <LoadingSpinner />
      ) : (
        <Grid container spacing={3}>
          {(activeTab === 0
            ? upcomingEvents
            : activeTab === 1
            ? pastEvents
            : userEvents
          ).map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <EventCard event={event} showActions={activeTab === 0} />
            </Grid>
          ))}
        </Grid>
      )}

      {events.length === 0 && status === 'succeeded' && (
        <Typography>No events found</Typography>
      )}
    </Box>
  )
}

export default EventsPage

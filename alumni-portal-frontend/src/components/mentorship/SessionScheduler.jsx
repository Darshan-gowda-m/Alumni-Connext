import { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'

const SessionScheduler = ({ mentorshipId, open, onClose, onSave }) => {
  const [session, setSession] = useState({
    date: new Date(),
    duration: 60,
    notes: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setSession({ ...session, [name]: value })
  }

  const handleDateChange = (date) => {
    setSession({ ...session, date })
  }

  const handleSubmit = () => {
    onSave(mentorshipId, session)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Schedule Mentorship Session</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <DateTimePicker
            label="Date & Time"
            value={session.date}
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField {...params} fullWidth sx={{ mt: 2 }} />
            )}
          />
        </Box>

        <TextField
          fullWidth
          type="number"
          label="Duration (minutes)"
          name="duration"
          value={session.duration}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Notes"
          name="notes"
          value={session.notes}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Schedule
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SessionScheduler

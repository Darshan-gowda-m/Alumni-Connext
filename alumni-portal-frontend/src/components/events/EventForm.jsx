import { useState } from 'react'
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import { format } from 'date-fns'

const EventForm = ({ event, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    startDateTime: event?.startDateTime
      ? new Date(event.startDateTime)
      : new Date(),
    endDateTime: event?.endDateTime ? new Date(event.endDateTime) : new Date(),
    location: event?.location || 'online',
    venue: event?.venue || '',
    targetBatches: event?.targetBatches || [],
    targetBranches: event?.targetBranches || [],
  })

  const branches = ['CSE', 'ISE', 'AIML', 'ECE', 'MECH', 'EEE', 'CIVIL', 'AERO']
  const currentYear = new Date().getFullYear()
  const batchYears = Array.from({ length: 10 }, (_, i) => currentYear - i)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleDateChange = (name, date) => {
    setFormData({ ...formData, [name]: date })
  }

  const handleMultiSelect = (name, value) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...formData,
      startDateTime: format(formData.startDateTime, "yyyy-MM-dd'T'HH:mm:ss"),
      endDateTime: format(formData.endDateTime, "yyyy-MM-dd'T'HH:mm:ss"),
    })
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {event ? 'Edit Event' : 'Create New Event'}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Event Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DateTimePicker
            label="Start Date & Time"
            value={formData.startDateTime}
            onChange={(date) => handleDateChange('startDateTime', date)}
            renderInput={(params) => (
              <TextField {...params} fullWidth required />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DateTimePicker
            label="End Date & Time"
            value={formData.endDateTime}
            onChange={(date) => handleDateChange('endDateTime', date)}
            renderInput={(params) => (
              <TextField {...params} fullWidth required />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Location</InputLabel>
            <Select
              name="location"
              value={formData.location}
              label="Location"
              onChange={handleChange}
              required
            >
              <MenuItem value="online">Online</MenuItem>
              <MenuItem value="campus">Campus</MenuItem>
              <MenuItem value="external">External Venue</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {formData.location === 'external' && (
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Venue"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              required
            />
          </Grid>
        )}

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Target Batches</InputLabel>
            <Select
              multiple
              name="targetBatches"
              value={formData.targetBatches}
              onChange={(e) =>
                handleMultiSelect('targetBatches', e.target.value)
              }
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {batchYears.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Target Branches</InputLabel>
            <Select
              multiple
              name="targetBranches"
              value={formData.targetBranches}
              onChange={(e) =>
                handleMultiSelect('targetBranches', e.target.value)
              }
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {branches.map((branch) => (
                <MenuItem key={branch} value={branch}>
                  {branch}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save Event
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default EventForm

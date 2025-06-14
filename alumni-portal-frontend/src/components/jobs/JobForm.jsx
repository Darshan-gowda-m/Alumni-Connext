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
import { DatePicker } from '@mui/x-date-pickers'
import { useState } from 'react'

const JobForm = ({ job, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    position: job?.position || '',
    description: job?.description || '',
    requirements: job?.requirements || [],
    location: job?.location || '',
    salaryRange: job?.salaryRange || { min: 0, max: 0, currency: 'INR' },
    applicationDeadline: job?.applicationDeadline
      ? new Date(job.applicationDeadline)
      : new Date(),
    targetBranches: job?.targetBranches || [],
  })

  const branches = ['CSE', 'ISE', 'AIML', 'ECE', 'MECH', 'EEE', 'CIVIL', 'AERO']

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSalaryChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      salaryRange: {
        ...formData.salaryRange,
        [name]: Number(value),
      },
    })
  }

  const handleRequirementsChange = (e) => {
    const requirements = e.target.value
      .split('\n')
      .filter((r) => r.trim() !== '')
    setFormData({ ...formData, requirements })
  }

  const handleDateChange = (date) => {
    setFormData({ ...formData, applicationDeadline: date })
  }

  const handleMultiSelect = (e) => {
    setFormData({ ...formData, targetBranches: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {job ? 'Edit Job Posting' : 'Create New Job Posting'}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Position"
            name="position"
            value={formData.position}
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

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Requirements (one per line)"
            name="requirements"
            value={formData.requirements.join('\n')}
            onChange={handleRequirementsChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DatePicker
            label="Application Deadline"
            value={formData.applicationDeadline}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            type="number"
            label="Min Salary (LPA)"
            name="min"
            value={formData.salaryRange.min}
            onChange={handleSalaryChange}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            type="number"
            label="Max Salary (LPA)"
            name="max"
            value={formData.salaryRange.max}
            onChange={handleSalaryChange}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Currency</InputLabel>
            <Select
              name="currency"
              value={formData.salaryRange.currency}
              label="Currency"
              onChange={(e) => handleSalaryChange(e)}
            >
              <MenuItem value="INR">INR</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Target Branches</InputLabel>
            <Select
              multiple
              name="targetBranches"
              value={formData.targetBranches}
              onChange={handleMultiSelect}
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
              {job ? 'Update Job' : 'Post Job'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default JobForm

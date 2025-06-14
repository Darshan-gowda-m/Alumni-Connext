import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Box,
  Divider,
} from '@mui/material'
import { formatDate } from '../../utils/formatters'
import { useNavigate } from 'react-router-dom'

const JobCard = ({ job, showApply = true }) => {
  const navigate = useNavigate()

  const handleApply = (e) => {
    e.stopPropagation()
    // Implement application functionality
  }

  const handleDetails = () => {
    navigate(`/jobs/${job._id}`)
  }

  return (
    <Card
      sx={{
        mb: 2,
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      }}
      onClick={handleDetails}
    >
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {job.position}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {job.postedBy?.name || 'Company Name'}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip label={job.location} size="small" />
          {job.salaryRange && (
            <Chip
              label={`₹${job.salaryRange.min} - ₹${job.salaryRange.max} LPA`}
              size="small"
              color="success"
            />
          )}
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Apply by: {formatDate(job.applicationDeadline)}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2">
            {job.applications?.length || 0} applications
          </Typography>

          {showApply && (
            <Button variant="contained" size="small" onClick={handleApply}>
              Apply Now
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default JobCard

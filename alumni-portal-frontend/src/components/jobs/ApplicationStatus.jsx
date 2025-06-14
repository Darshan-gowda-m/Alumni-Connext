import { Chip } from '@mui/material'

const statusConfig = {
  submitted: { label: 'Submitted', color: 'default' },
  reviewed: { label: 'Under Review', color: 'info' },
  rejected: { label: 'Rejected', color: 'error' },
  hired: { label: 'Hired', color: 'success' },
}

const ApplicationStatus = ({ status }) => {
  const config = statusConfig[status] || { label: status, color: 'default' }

  return (
    <Chip
      label={config.label}
      color={config.color}
      size="small"
      sx={{ fontWeight: 'bold' }}
    />
  )
}

export default ApplicationStatus

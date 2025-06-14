import { Button, Menu, MenuItem, Box } from '@mui/material'
import { useState } from 'react'

const RSVPButton = ({ eventId, currentStatus, onRSVP }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [status, setStatus] = useState(currentStatus)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleRSVP = (newStatus) => {
    setStatus(newStatus)
    onRSVP(eventId, newStatus)
    handleClose()
  }

  const getButtonProps = () => {
    switch (status) {
      case 'attending':
        return { color: 'success', variant: 'contained', label: 'Attending' }
      case 'maybe':
        return { color: 'warning', variant: 'outlined', label: 'Maybe' }
      case 'declined':
        return { color: 'error', variant: 'outlined', label: 'Declined' }
      default:
        return { color: 'primary', variant: 'outlined', label: 'RSVP' }
    }
  }

  const { color, variant, label } = getButtonProps()

  return (
    <Box>
      <Button
        color={color}
        variant={variant}
        onClick={handleClick}
        size="small"
      >
        {label}
      </Button>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleRSVP('attending')}>Attending</MenuItem>
        <MenuItem onClick={() => handleRSVP('maybe')}>Maybe</MenuItem>
        <MenuItem onClick={() => handleRSVP('declined')}>Decline</MenuItem>
      </Menu>
    </Box>
  )
}

export default RSVPButton

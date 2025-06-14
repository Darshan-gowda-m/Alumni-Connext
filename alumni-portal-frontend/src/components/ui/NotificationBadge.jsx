import { Badge } from '@mui/material'

const NotificationBadge = ({ count, children }) => {
  return (
    <Badge
      badgeContent={count}
      color="error"
      overlap="circular"
      sx={{
        '& .MuiBadge-badge': {
          right: 5,
          top: 5,
          padding: '0 4px',
        },
      }}
    >
      {children}
    </Badge>
  )
}

export default NotificationBadge

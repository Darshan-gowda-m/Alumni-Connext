import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Badge,
} from '@mui/material'
import {
  Notifications as NotificationsIcon,
  Message as MessageIcon,
  Menu as MenuIcon,
  AccountCircle,
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../features/auth/authSlice'
import useAuth from '../../hooks/useAuth'

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null)
  const { user, isAuthenticated } = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const notificationCount = 3 // Hardcoded for demo
  const messageCount = 5 // Hardcoded for demo

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setMobileMenuAnchor(null)
  }

  const handleLogout = () => {
    dispatch(logout())
    handleClose()
    navigate('/login')
  }

  const handleProfile = () => {
    navigate('/profile')
    handleClose()
  }

  const renderDesktopMenu = () => (
    <div>
      <IconButton color="inherit">
        <Badge badgeContent={notificationCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <IconButton color="inherit">
        <Badge badgeContent={messageCount} color="error">
          <MessageIcon />
        </Badge>
      </IconButton>
      <Button color="inherit" onClick={handleMenuOpen}>
        <Avatar src={user?.avatarUrl} sx={{ width: 30, height: 30, mr: 1 }} />
        <Typography variant="body1" sx={{ ml: 1 }}>
          {user?.name}
        </Typography>
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  )

  const renderMobileMenu = () => (
    <Menu
      anchorEl={mobileMenuAnchor}
      open={Boolean(mobileMenuAnchor)}
      onClose={handleClose}
    >
      <MenuItem onClick={() => navigate('/events')}>Events</MenuItem>
      <MenuItem onClick={() => navigate('/jobs')}>Jobs</MenuItem>
      <MenuItem onClick={() => navigate('/mentorship')}>Mentorship</MenuItem>
      <MenuItem onClick={() => navigate('/messages')}>Messages</MenuItem>
      {user?.role === 'admin' && (
        <MenuItem onClick={() => navigate('/analytics')}>Analytics</MenuItem>
      )}
      <MenuItem onClick={handleProfile}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  )

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            University Connect
          </Link>
        </Typography>

        {isAuthenticated ? (
          <>
            <Box
              sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
            >
              <Button color="inherit" onClick={() => navigate('/events')}>
                Events
              </Button>
              <Button color="inherit" onClick={() => navigate('/jobs')}>
                Jobs
              </Button>
              <Button color="inherit" onClick={() => navigate('/mentorship')}>
                Mentorship
              </Button>
              <Button color="inherit" onClick={() => navigate('/messages')}>
                Messages
              </Button>
              {user?.role === 'admin' && (
                <Button color="inherit" onClick={() => navigate('/analytics')}>
                  Analytics
                </Button>
              )}
              {renderDesktopMenu()}
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton color="inherit" onClick={handleMobileMenuOpen}>
                <MenuIcon />
              </IconButton>
            </Box>

            {renderMobileMenu()}
          </>
        ) : (
          <div>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar

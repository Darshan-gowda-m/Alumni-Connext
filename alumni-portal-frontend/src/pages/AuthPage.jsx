import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Tabs, Tab, Paper } from '@mui/material'
import { useDispatch } from 'react-redux'
import { loginUser, registerUser } from '../features/auth/authThunks'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue)
  }

  const handleLogin = async (credentials) => {
    try {
      await dispatch(loginUser(credentials)).unwrap()
      navigate('/')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const handleRegister = async (userData) => {
    try {
      await dispatch(registerUser(userData)).unwrap()
      navigate('/profile')
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: 450,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          sx={{ mb: 3 }}
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        {activeTab === 0 ? (
          <LoginForm onSubmit={handleLogin} />
        ) : (
          <RegisterForm onSubmit={handleRegister} />
        )}
      </Paper>
    </Box>
  )
}

export default AuthPage

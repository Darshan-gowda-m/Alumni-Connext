import { Box, CssBaseline, Container } from '@mui/material'
import Navbar from '../ui/Navbar'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/auth/authSlice'

const MainLayout = ({ children }) => {
  const user = useSelector(selectCurrentUser)

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar />
      {user && <Sidebar />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${user ? 240 : 0}px)` },
        }}
      >
        <Container maxWidth="xl">{children}</Container>
      </Box>
    </Box>
  )
}

export default MainLayout

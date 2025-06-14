import { useState, useEffect } from 'react'
import {
  Box,
  Tabs,
  Tab,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAllUsers,
  verifyUserAccount,
  fetchUnverifiedUsers,
  fetchUniversityStats,
} from '../features/admin/adminThunks'
import { selectCurrentUser } from '../features/auth/authSlice'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const AdminPage = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  const { users, unverifiedUsers, universityStats, status } = useSelector(
    (state) => state.admin
  )
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    if (user?.role === 'admin') {
      dispatch(fetchAllUsers())
      dispatch(fetchUnverifiedUsers())
      dispatch(fetchUniversityStats())
    }
  }, [dispatch, user])

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue)
  }

  const handleVerifyUser = (userId) => {
    dispatch(verifyUserAccount(userId))
  }

  const pendingVerification = unverifiedUsers.filter((u) => !u.isVerified)
  const students = users.filter((u) => u.role === 'student')
  const alumni = users.filter((u) => u.role === 'alumni')
  const faculty = users.filter((u) => u.role === 'faculty')

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="User Management" />
        <Tab label="Verification Requests" />
        <Tab label="University Stats" />
      </Tabs>

      {status === 'loading' ? (
        <LoadingSpinner />
      ) : (
        <>
          {activeTab === 0 && (
            <Box>
              <Typography variant="h5" gutterBottom>
                All Users ({users.length})
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Batch</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Chip label={user.role} size="small" />
                        </TableCell>
                        <TableCell>{user.batch || '-'}</TableCell>
                        <TableCell>
                          {user.isVerified ? (
                            <Chip
                              label="Verified"
                              color="success"
                              size="small"
                            />
                          ) : (
                            <Chip
                              label="Pending"
                              color="warning"
                              size="small"
                            />
                          )}
                        </TableCell>
                        <TableCell>
                          {!user.isVerified && (
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => handleVerifyUser(user._id)}
                            >
                              Verify
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {activeTab === 1 && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Pending Verification ({pendingVerification.length})
              </Typography>

              {pendingVerification.length > 0 ? (
                <Grid container spacing={3}>
                  {pendingVerification.map((user) => (
                    <Grid item xs={12} sm={6} md={4} key={user._id}>
                      <Paper sx={{ p: 2 }}>
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
                        >
                          <Avatar src={user.avatarUrl} sx={{ mr: 2 }} />
                          <Box>
                            <Typography variant="h6">{user.name}</Typography>
                            <Typography>{user.email}</Typography>
                          </Box>
                        </Box>
                        <Typography>
                          {user.role} · Batch {user.batch}
                        </Typography>
                        <Button
                          fullWidth
                          variant="contained"
                          size="small"
                          sx={{ mt: 2 }}
                          onClick={() => handleVerifyUser(user._id)}
                        >
                          Verify Account
                        </Button>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography>No pending verification requests</Typography>
              )}
            </Box>
          )}

          {activeTab === 2 && universityStats && (
            <Box>
              <Typography variant="h5" gutterBottom>
                University Statistics
              </Typography>

              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="h3">
                      {universityStats.totalUsers}
                    </Typography>
                    <Typography variant="h6">Total Users</Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="h3">
                      {universityStats.activeUsers}
                    </Typography>
                    <Typography variant="h6">Active Users</Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="h3">
                      {universityStats.eventsCount}
                    </Typography>
                    <Typography variant="h6">Events</Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper sx={{ p: 3, mt: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      User Distribution
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={3}>
                        <Typography>Students: {students.length}</Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Typography>Alumni: {alumni.length}</Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Typography>Faculty: {faculty.length}</Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Typography>
                          Admins:{' '}
                          {users.filter((u) => u.role === 'admin').length}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}
        </>
      )}
    </Box>
  )
}

export default AdminPage

import { useState, useEffect } from 'react'
import { Box, Tabs, Tab, Grid, Avatar, Typography, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import ProfileForm from '../components/profile/ProfileForm'
import UserConnections from '../components/profile/UserConnections'
import UserAchievements from '../components/profile/UserAchievements'
import UserSkills from '../components/profile/UserSkills'
import {
  fetchUserProfile,
  updateUserProfile,
} from '../features/auth/authThunks'
import { selectCurrentUser } from '../features/auth/authSlice'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  const [activeTab, setActiveTab] = useState(0)
  const [editMode, setEditMode] = useState(false)
  const [profileData, setProfileData] = useState({})

  useEffect(() => {
    if (user) {
      dispatch(fetchUserProfile())
      setProfileData({ ...user })
    }
  }, [dispatch, user])

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue)
  }

  const handleSave = async (updatedData) => {
    try {
      await dispatch(updateUserProfile(updatedData)).unwrap()
      setEditMode(false)
    } catch (error) {
      console.error('Profile update failed:', error)
    }
  }

  if (!user) return <LoadingSpinner fullScreen />

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">My Profile</Typography>
        <Button variant="outlined" onClick={() => setEditMode(!editMode)}>
          {editMode ? 'Cancel' : 'Edit Profile'}
        </Button>
      </Box>

      {editMode ? (
        <ProfileForm
          user={profileData}
          onChange={setProfileData}
          onSave={handleSave}
        />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                textAlign: 'center',
                bgcolor: 'background.paper',
                p: 3,
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Avatar
                src={user.avatarUrl}
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 2,
                }}
              />
              <Typography variant="h5">{user.name}</Typography>
              <Typography color="textSecondary">{user.role}</Typography>
              <Typography>
                {user.branch} · Batch of {user.batch}
              </Typography>
              {user.company && (
                <Typography>
                  {user.position} at {user.company}
                </Typography>
              )}
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" size="small" sx={{ mr: 1 }}>
                  Connect
                </Button>
                <Button variant="outlined" size="small">
                  Message
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
              <Tab label="About" />
              <Tab label="Skills" />
              <Tab label="Connections" />
              <Tab label="Achievements" />
            </Tabs>

            {activeTab === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Bio
                </Typography>
                <Typography sx={{ mb: 3 }}>
                  {user.bio || 'No bio added'}
                </Typography>

                <Typography variant="h6" gutterBottom>
                  Education
                </Typography>
                <Typography>
                  {user.universityName} · {user.branch} · Batch {user.batch}
                </Typography>

                {user.role === 'alumni' && user.workExperience?.length > 0 && (
                  <>
                    <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                      Work Experience
                    </Typography>
                    {user.workExperience.map((exp, idx) => (
                      <Box key={idx} sx={{ mb: 2 }}>
                        <Typography fontWeight="bold">
                          {exp.position}
                        </Typography>
                        <Typography>{exp.company}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {new Date(exp.startDate).toLocaleDateString()} -{' '}
                          {exp.current
                            ? 'Present'
                            : new Date(exp.endDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                    ))}
                  </>
                )}
              </Box>
            )}

            {activeTab === 1 && <UserSkills skills={user.skills || []} />}
            {activeTab === 2 && (
              <UserConnections connections={user.connections || []} />
            )}
            {activeTab === 3 && (
              <UserAchievements achievements={user.achievements || []} />
            )}
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default ProfilePage

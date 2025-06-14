import { useState, useEffect } from 'react'
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  Avatar,
  Box,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { updateUserProfile } from '../../features/auth/authThunks'
import useAuth from '../../hooks/useAuth'

const ProfileForm = ({ user, onSave }) => {
  const dispatch = useDispatch()
  const { isStudent, isAlumni } = useAuth()
  const [avatarPreview, setAvatarPreview] = useState(user.avatarUrl || '')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      batch: user.batch,
      branch: user.branch,
      company: user.company || '',
      position: user.position || '',
      bio: user.bio || '',
      skills: user.skills?.join(', ') || '',
    },
  })

  const branches = ['CSE', 'ISE', 'AIML', 'ECE', 'MECH', 'EEE', 'CIVIL', 'AERO']

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result)
        setValue('avatar', file)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = (data) => {
    const formData = new FormData()

    // Append all fields to formData
    Object.keys(data).forEach((key) => {
      if (key === 'skills') {
        formData.append(
          'skills',
          data.skills.split(',').map((skill) => skill.trim())
        )
      } else if (key === 'workExperience' || key === 'projects') {
        // Handle nested objects
      } else if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key])
      }
    })

    if (data.avatar) {
      formData.append('avatar', data.avatar)
    }

    dispatch(updateUserProfile(formData))
      .unwrap()
      .then(() => onSave && onSave())
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="avatar-upload"
          type="file"
          onChange={handleAvatarChange}
        />
        <label htmlFor="avatar-upload">
          <Avatar
            src={avatarPreview}
            sx={{
              width: 120,
              height: 120,
              margin: '0 auto',
              cursor: 'pointer',
            }}
          />
        </label>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Click to change profile photo
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Full Name"
              {...register('name', { required: 'Name is required' })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@(univ\.edu|alum\.univ\.edu)$/i,
                  message: 'Must be a university email',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Batch"
              {...register('batch', { required: 'Batch is required' })}
              error={!!errors.batch}
              helperText={errors.batch?.message}
            >
              {Array.from(
                { length: 30 },
                (_, i) => new Date().getFullYear() - i
              ).map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Branch"
              {...register('branch', { required: 'Branch is required' })}
              error={!!errors.branch}
              helperText={errors.branch?.message}
            >
              {branches.map((branch) => (
                <MenuItem key={branch} value={branch}>
                  {branch}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {isAlumni && (
            <>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Company" {...register('company')} />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Position"
                  {...register('position')}
                />
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Skills (comma separated)"
              {...register('skills')}
              helperText="List your skills separated by commas"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Bio"
              {...register('bio')}
            />
          </Grid>

          {(isStudent || isAlumni) && (
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                {isStudent ? 'Education' : 'Work Experience'}
              </Typography>
              {/* Dynamic form fields for education/work experience would go here */}
            </Grid>
          )}

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Save Profile
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default ProfileForm

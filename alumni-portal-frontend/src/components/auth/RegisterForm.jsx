import { useState } from 'react'
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Avatar,
  IconButton,
} from '@mui/material'
import { PhotoCamera } from '@mui/icons-material'
import { useForm } from 'react-hook-form'

const branches = ['CSE', 'ISE', 'AIML', 'ECE', 'MECH', 'EEE', 'CIVIL', 'AERO']
const roles = [
  { value: 'student', label: 'Student' },
  { value: 'alumni', label: 'Alumni' },
  { value: 'faculty', label: 'Faculty' },
]

const RegisterForm = ({ onSubmit }) => {
  const [avatarPreview, setAvatarPreview] = useState('')
  const [selectedRole, setSelectedRole] = useState('student')
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

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

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value)
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="avatar-upload-register"
          type="file"
          onChange={handleAvatarChange}
        />
        <label htmlFor="avatar-upload-register">
          <IconButton color="primary" component="span">
            <Avatar
              src={avatarPreview}
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'primary.main',
              }}
            >
              <PhotoCamera fontSize="large" />
            </Avatar>
          </IconButton>
        </label>
      </Box>

      <TextField
        fullWidth
        margin="normal"
        label="Full Name"
        {...register('name', { required: 'Name is required' })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Email"
        type="email"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /.+@(univ\.edu|alum\.univ\.edu)$/,
            message: 'Must be a university email',
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Password"
        type="password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Confirm Password"
        type="password"
        {...register('confirmPassword', {
          required: 'Please confirm your password',
          validate: (value) =>
            value === document.querySelector('input[name="password"]')?.value ||
            'Passwords do not match',
        })}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Role</InputLabel>
        <Select
          label="Role"
          {...register('role', { required: 'Role is required' })}
          value={selectedRole}
          onChange={handleRoleChange}
          error={!!errors.role}
        >
          {roles.map((role) => (
            <MenuItem key={role.value} value={role.value}>
              {role.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {(selectedRole === 'student' || selectedRole === 'alumni') && (
        <>
          <TextField
            fullWidth
            margin="normal"
            label="USN (University Seat Number)"
            {...register('usn', {
              required:
                selectedRole === 'student' && 'USN is required for students',
              pattern: {
                value: /^[A-Z0-9]{8,12}$/,
                message: 'Invalid USN format',
              },
            })}
            error={!!errors.usn}
            helperText={errors.usn?.message}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Branch</InputLabel>
            <Select
              label="Branch"
              {...register('branch', {
                required:
                  (selectedRole === 'student' || selectedRole === 'alumni') &&
                  'Branch is required',
              })}
              error={!!errors.branch}
            >
              {branches.map((branch) => (
                <MenuItem key={branch} value={branch}>
                  {branch}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            select
            fullWidth
            margin="normal"
            label="Batch"
            {...register('batch', {
              required:
                (selectedRole === 'student' || selectedRole === 'alumni') &&
                'Batch is required',
              validate: (value) => {
                const currentYear = new Date().getFullYear()
                return (
                  (value >= 1990 && value < currentYear) ||
                  `Batch must be between 1990 and ${currentYear - 1}`
                )
              },
            })}
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
        </>
      )}

      {selectedRole === 'alumni' && (
        <>
          <TextField
            fullWidth
            margin="normal"
            label="Company"
            {...register('company')}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Position"
            {...register('position')}
          />
        </>
      )}

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Create Account
      </Button>
    </Box>
  )
}

export default RegisterForm

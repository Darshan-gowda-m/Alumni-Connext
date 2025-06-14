import { TextField, Button, Box, Typography, Link } from '@mui/material'
import { useForm } from 'react-hook-form'

const LoginForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
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
        {...register('password', { required: 'Password is required' })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Link href="#" variant="body2">
          Forgot password?
        </Link>
      </Box>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2 }}>
        Sign In
      </Button>

      <Typography variant="body2" align="center">
        Don't have an account?{' '}
        <Link href="#" variant="body2">
          Register
        </Link>
      </Typography>
    </Box>
  )
}

export default LoginForm

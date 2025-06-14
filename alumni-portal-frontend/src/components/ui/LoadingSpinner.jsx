import { CircularProgress, Box } from '@mui/material'

const LoadingSpinner = ({ size = 40, fullScreen = false }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...(fullScreen
          ? {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.1)',
              zIndex: 9999,
            }
          : { py: 4 }),
      }}
    >
      <CircularProgress size={size} />
    </Box>
  )
}

export default LoadingSpinner

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Box, Typography } from '@mui/material'

const EngagementMetrics = ({ data }) => {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Typography variant="h6" gutterBottom align="center">
        User Engagement Metrics
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 50,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="activeUsers" fill="#8884d8" name="Active Users" />
          <Bar dataKey="newUsers" fill="#82ca9d" name="New Users" />
          <Bar dataKey="eventsCreated" fill="#ffc658" name="Events Created" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default EngagementMetrics

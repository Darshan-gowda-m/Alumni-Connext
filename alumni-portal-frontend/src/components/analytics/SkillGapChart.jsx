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

const SkillGapChart = ({ data }) => {
  // Transform data for chart
  const chartData = data.map((skill) => ({
    name: skill.skill,
    Industry: skill.industryDemand,
    Students: skill.studentProficiency,
    gap: skill.gap,
  }))

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Typography variant="h6" gutterBottom align="center">
        Skill Gap Analysis
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 50,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
          <YAxis domain={[0, 100]} />
          <Tooltip
            formatter={(value) => [`${value}%`, '']}
            labelFormatter={(value) => `Skill: ${value}`}
          />
          <Legend />
          <Bar dataKey="Industry" fill="#8884d8" />
          <Bar dataKey="Students" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default SkillGapChart

import { useState, useEffect } from 'react'
import { Box, Tabs, Tab, Grid, Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import SkillGapChart from '../components/analytics/SkillGapChart'
import EngagementMetrics from '../components/analytics/EngagementMetrics'
import PlacementStats from '../components/analytics/PlacementStats'
import {
  fetchDashboardData,
  exportAnalyticsData,
  calculateSkillGapsData,
} from '../features/analytics/analyticsThunks'
import { selectCurrentUser } from '../features/auth/authSlice'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const AnalyticsPage = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  const { skillGaps, engagement, placement, status } = useSelector(
    (state) => state.analytics
  )
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    if (user?.role === 'admin') {
      dispatch(fetchDashboardData())
    }
  }, [dispatch, user])

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue)
  }

  const handleExport = (type) => {
    dispatch(exportAnalyticsData(type))
  }

  const handleRecalculate = () => {
    dispatch(calculateSkillGapsData())
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Analytics Dashboard
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button
          variant="outlined"
          onClick={handleRecalculate}
          disabled={status === 'loading'}
        >
          Recalculate Skill Gaps
        </Button>
      </Box>

      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Skill Gaps" />
        <Tab label="User Engagement" />
        <Tab label="Placement Stats" />
      </Tabs>

      {status === 'loading' ? (
        <LoadingSpinner />
      ) : (
        <>
          {activeTab === 0 && (
            <Box>
              <Button
                variant="outlined"
                onClick={() => handleExport('skill_gap')}
                sx={{ mb: 2 }}
              >
                Export as CSV
              </Button>
              <SkillGapChart data={skillGaps} />
            </Box>
          )}

          {activeTab === 1 && (
            <Box>
              <Button
                variant="outlined"
                onClick={() => handleExport('user_engagement')}
                sx={{ mb: 2 }}
              >
                Export as CSV
              </Button>
              <EngagementMetrics data={engagement} />
            </Box>
          )}

          {activeTab === 2 && (
            <Box>
              <Button
                variant="outlined"
                onClick={() => handleExport('placement')}
                sx={{ mb: 2 }}
              >
                Export as CSV
              </Button>
              <PlacementStats data={placement} />
            </Box>
          )}
        </>
      )}
    </Box>
  )
}

export default AnalyticsPage

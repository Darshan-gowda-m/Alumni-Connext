import { useState, useEffect } from 'react'
import { Button, Grid, Typography, Tabs, Tab, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import JobCard from '../components/jobs/JobCard'
import JobForm from '../components/jobs/JobForm'
import { fetchJobs, createNewJob, applyToJob } from '../features/jobs/jobThunks'
import { selectCurrentUser } from '../features/auth/authSlice'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import ApplicationStatus from '../components/jobs/ApplicationStatus'

const JobsPage = () => {
  const dispatch = useDispatch()
  const { jobs, status } = useSelector((state) => state.jobs)
  const user = useSelector(selectCurrentUser)
  const [activeTab, setActiveTab] = useState(0)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    dispatch(fetchJobs())
  }, [dispatch])

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue)
  }

  const handleCreateJob = async (jobData) => {
    try {
      await dispatch(createNewJob(jobData)).unwrap()
      setShowForm(false)
    } catch (error) {
      console.error('Failed to create job:', error)
    }
  }

  const handleApply = async (jobId) => {
    try {
      await dispatch(applyToJob(jobId)).unwrap()
    } catch (error) {
      console.error('Application failed:', error)
    }
  }

  const userApplications = jobs.filter((job) =>
    job.applications.some((app) => app.applicant === user?._id)
  )

  const userJobs = jobs.filter((job) => job.postedBy === user?._id)

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Job Opportunities</Typography>
        {user?.role === 'alumni' && (
          <Button variant="contained" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Post Job'}
          </Button>
        )}
      </Box>

      {showForm && (
        <JobForm
          onSubmit={handleCreateJob}
          onCancel={() => setShowForm(false)}
        />
      )}

      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="All Jobs" />
        <Tab label="My Applications" />
        {user?.role === 'alumni' && <Tab label="My Postings" />}
      </Tabs>

      {status === 'loading' ? (
        <LoadingSpinner />
      ) : (
        <Grid container spacing={3}>
          {(activeTab === 0
            ? jobs
            : activeTab === 1
            ? userApplications
            : userJobs
          ).map((job) => (
            <Grid item xs={12} key={job._id}>
              <JobCard
                job={job}
                onApply={() => handleApply(job._id)}
                showApply={activeTab === 0 && user?.role === 'student'}
              />
              {activeTab === 1 &&
                job.applications.find((app) => app.applicant === user._id) && (
                  <Box sx={{ mt: 1, ml: 2 }}>
                    <Typography variant="body2">
                      Application Status:
                      <ApplicationStatus
                        status={
                          job.applications.find(
                            (app) => app.applicant === user._id
                          ).status
                        }
                      />
                    </Typography>
                  </Box>
                )}
            </Grid>
          ))}
        </Grid>
      )}

      {jobs.length === 0 && status === 'succeeded' && (
        <Typography>No job postings found</Typography>
      )}
    </Box>
  )
}

export default JobsPage

import {
  createJob,
  getJobs,
  applyForJob,
  getJobApplications,
  updateApplicationStatus,
} from '../../api/jobs'
import { setJobs, addJob, updateJob, setLoading, setError } from './jobSlice'

export const fetchJobs = () => async (dispatch) => {
  try {
    dispatch(setLoading())
    const jobs = await getJobs()
    dispatch(setJobs(jobs))
    return jobs
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const createNewJob = (jobData) => async (dispatch) => {
  try {
    dispatch(setLoading())
    const job = await createJob(jobData)
    dispatch(addJob(job))
    return job
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const applyToJob = (jobId) => async (dispatch) => {
  try {
    const updatedJob = await applyForJob(jobId)
    dispatch(updateJob(updatedJob))
    return updatedJob
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const fetchJobApplications = (jobId) => async (dispatch) => {
  try {
    return await getJobApplications(jobId)
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const updateApplication =
  (jobId, applicationId, status) => async (dispatch) => {
    try {
      const updatedJob = await updateApplicationStatus(
        jobId,
        applicationId,
        status
      )
      dispatch(updateJob(updatedJob))
      return updatedJob
    } catch (error) {
      dispatch(setError(error.message))
      throw error
    }
  }

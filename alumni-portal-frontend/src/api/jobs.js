import axios from 'axios'
import { API_URL } from '../config';
import { getToken } from '../utils/auth'



export const createJob = async (jobData) => {
  const token = getToken()
  const response = await axios.post(`${API_URL}/jobs`, jobData, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const getJobs = async () => {
  const token = getToken()
  const response = await axios.get(`${API_URL}/jobs`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const applyForJob = async (jobId) => {
  const token = getToken()
  const response = await axios.post(
    `${API_URL}/jobs/${jobId}/apply`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}

export const getJobApplications = async (jobId) => {
  const token = getToken()
  const response = await axios.get(`${API_URL}/jobs/${jobId}/applications`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const updateApplicationStatus = async (jobId, applicationId, status) => {
  const token = getToken()
  const response = await axios.put(
    `${API_URL}/jobs/${jobId}/applications/${applicationId}`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}

import axios from 'axios'
import { getToken } from './auth'

const API_URL = process.env.REACT_APP_API_URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific status codes
      if (error.response.status === 401) {
        // Handle unauthorized access
        console.error('Unauthorized access - redirecting to login')
        window.location.href = '/login'
      }
      return Promise.reject(error.response.data)
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject({ message: 'No response from server' })
    } else {
      // Something happened in setting up the request
      return Promise.reject({ message: error.message })
    }
  }
)

export default api

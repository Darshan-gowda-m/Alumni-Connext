import { format } from 'date-fns'

// Format date to "Jan 1, 2023"
export const formatDate = (date) => {
  return format(new Date(date), 'MMM d, yyyy')
}

// Format date to "Jan 1, 2023 10:30 AM"
export const formatDateTime = (date) => {
  return format(new Date(date), 'MMM d, yyyy h:mm a')
}

// Format time to "2 hours 30 minutes"
export const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours} hr${hours !== 1 ? 's' : ''} ${mins} min${
    mins !== 1 ? 's' : ''
  }`
}

// Capitalize first letter of each word
export const capitalize = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}

// Truncate text with ellipsis
export const truncate = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Generate a unique ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9)
}

// Format currency
export const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

// Calculate skill gap percentage
export const calculateGap = (industry, students) => {
  return Math.max(0, industry - students)
}

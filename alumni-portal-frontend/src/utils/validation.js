export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email) && email.endsWith('.edu')
}

export const validatePassword = (password) => {
  return password.length >= 8
}

export const validateName = (name) => {
  return name.trim().length >= 2
}

export const validateBatch = (batch) => {
  const currentYear = new Date().getFullYear()
  return batch >= 1990 && batch < currentYear
}

export const validateEvent = (event) => {
  const errors = {}

  if (!event.title || event.title.trim().length < 5) {
    errors.title = 'Event title must be at least 5 characters'
  }

  if (!event.startDateTime || new Date(event.startDateTime) < new Date()) {
    errors.startDateTime = 'Start date must be in the future'
  }

  if (
    event.endDateTime &&
    new Date(event.endDateTime) < new Date(event.startDateTime)
  ) {
    errors.endDateTime = 'End date must be after start date'
  }

  return errors
}

export const validateJob = (job) => {
  const errors = {}

  if (!job.position || job.position.trim().length < 3) {
    errors.position = 'Position is required'
  }

  if (job.salaryRange && job.salaryRange.min > job.salaryRange.max) {
    errors.salaryRange = 'Min salary cannot be greater than max salary'
  }

  return errors
}

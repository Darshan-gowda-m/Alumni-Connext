import {
  sendMentorshipRequest,
  getMentorshipRequests,
  respondToMentorship,
  scheduleSession,
  endMentorship,
  rateMentorship,
} from '../../api/mentorship'
import {
  setRequests,
  addRequest,
  updateRequest,
  setActiveMentorships,
  addSession,
  setLoading,
  setError,
} from './mentorshipSlice'

export const createMentorshipRequest = (requestData) => async (dispatch) => {
  try {
    dispatch(setLoading())
    const request = await sendMentorshipRequest(requestData)
    dispatch(addRequest(request))
    return request
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const fetchMentorshipRequests = () => async (dispatch) => {
  try {
    dispatch(setLoading())
    const requests = await getMentorshipRequests()
    dispatch(setRequests(requests))
    return requests
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const respondToRequest = (requestId, status) => async (dispatch) => {
  try {
    const updatedRequest = await respondToMentorship(requestId, status)
    dispatch(updateRequest(updatedRequest))
    return updatedRequest
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const fetchActiveMentorships = () => async (dispatch) => {
  try {
    const mentorships = await getMentorshipRequests()
    const active = mentorships.filter((m) => m.status === 'accepted')
    dispatch(setActiveMentorships(active))
    return active
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const scheduleMentorshipSession =
  (mentorshipId, sessionData) => async (dispatch) => {
    try {
      const session = await scheduleSession(mentorshipId, sessionData)
      dispatch(addSession({ mentorshipId, session }))
      return session
    } catch (error) {
      dispatch(setError(error.message))
      throw error
    }
  }

export const endMentorshipProgram = (mentorshipId) => async (dispatch) => {
  try {
    const updatedMentorship = await endMentorship(mentorshipId)
    dispatch(updateRequest(updatedMentorship))
    return updatedMentorship
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const rateMentorshipProgram =
  (mentorshipId, rating) => async (dispatch) => {
    try {
      const updatedMentorship = await rateMentorship(mentorshipId, rating)
      dispatch(updateRequest(updatedMentorship))
      return updatedMentorship
    } catch (error) {
      dispatch(setError(error.message))
      throw error
    }
  }

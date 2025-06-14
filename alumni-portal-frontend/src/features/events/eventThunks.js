import {
  createEvent,
  getEvents,
  rsvpEvent,
  deleteEvent,
} from '../../api/events'
import {
  setEvents,
  addEvent,
  updateEvent,
  removeEvent,
  setLoading,
  setError,
} from './eventSlice'

export const fetchEvents = () => async (dispatch) => {
  try {
    dispatch(setLoading())
    const events = await getEvents()
    dispatch(setEvents(events))
    return events
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const createNewEvent = (eventData) => async (dispatch) => {
  try {
    dispatch(setLoading())
    const event = await createEvent(eventData)
    dispatch(addEvent(event))
    return event
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const rsvpToEvent = (eventId, status) => async (dispatch) => {
  try {
    const updatedEvent = await rsvpEvent(eventId, status)
    dispatch(updateEvent(updatedEvent))
    return updatedEvent
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

export const deleteExistingEvent = (eventId) => async (dispatch) => {
  try {
    await deleteEvent(eventId)
    dispatch(removeEvent(eventId))
  } catch (error) {
    dispatch(setError(error.message))
    throw error
  }
}

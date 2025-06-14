import { useEffect } from 'react'
import { connectSocket, getSocket, disconnectSocket } from '../utils/socket'

const useSocket = (eventHandlers = {}) => {
  useEffect(() => {
    connectSocket()
    const socket = getSocket()

    Object.entries(eventHandlers).forEach(([event, handler]) => {
      socket.on(event, handler)
    })

    return () => {
      Object.keys(eventHandlers).forEach((event) => {
        socket.off(event)
      })

      if (Object.keys(socket._callbacks).length === 0) {
        disconnectSocket()
      }
    }
  }, [eventHandlers])

  const emit = (event, data) => {
    const socket = getSocket()
    socket.emit(event, data)
  }

  return { emit }
}

export default useSocket

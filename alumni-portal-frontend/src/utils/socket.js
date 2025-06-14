import io from 'socket.io-client';
import { getToken } from './auth';

let socket = null;

export const connectSocket = () => {
  if (!socket) {
    socket = io('http://localhost:5000', {
      auth: {
        token: getToken()
      }
    });
  }
  return socket;
}
export const getSocket = () => {
  if (!socket) {
    throw new Error('Socket not connected!')
  }
  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

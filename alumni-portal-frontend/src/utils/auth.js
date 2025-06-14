export const storeToken = (token) => localStorage.setItem('token', token)
export const getToken = () => localStorage.getItem('token')
export const clearToken = () => localStorage.removeItem('token')

export const isAuthenticated = () => !!getToken()
export const getUserRole = () => {
  const token = getToken()
  if (!token) return null

  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(window.atob(base64))
    return payload.role
  } catch (e) {
    clearToken()
    return null
  }
}

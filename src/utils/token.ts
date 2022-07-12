export const TOKEN_NAME = 'AuthorizationToken'

export const setToken = (value = '') => {
  localStorage.setItem(TOKEN_NAME, value)
}

export const getToken = () => {
  return localStorage.getItem(TOKEN_NAME) || ''
}

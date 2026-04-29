const TOKEN_KEY = 'token'

export const authStorage = {
  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token)
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },

  clear() {
    localStorage.removeItem(TOKEN_KEY)
  },
}

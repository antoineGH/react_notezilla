import { createAuthProvider } from 'react-token-auth'

export const { useAuth, authFetch, login, logout } = createAuthProvider({
  accessTokenKey: 'access_token',
  getAccessToken: session => session.access_token,
  onUpdateToken: token =>
    fetch('/api/refresh', {
      method: 'POST',
      body: token.access_token,
    })
      .then(r => r.json())
      .catch(error => {
        logout()
        window.location.reload(false)
        throw error
      }),
})

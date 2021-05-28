import axios from './axios'

export async function login(credentials: { email: string; password: string }) {
  const { email, password } = credentials
  const res = await axios.post(
    '/login',
    { email: email, password: password },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  return res.data
}

export async function register(credentials: { name: string; email: string; password: string }) {
  const { name, email, password } = credentials
  const res = await axios.post(
    '/register',
    { firstname: name, email: email, password: password },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  return res.data
}

export async function getUserDetails(accessToken: string) {
  const res = await axios.get('/auth/user', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  })
  return res.data
}

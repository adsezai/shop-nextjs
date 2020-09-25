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

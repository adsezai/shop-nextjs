import { useState } from 'react'
import { useRouter } from 'next/router'
import { login } from '../lib/api/client/clientRequests'

export default function Login() {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const router = useRouter()

  const handleLogin = async () => {
    try {
      const res = await login(email, password)
      router.push('/')
    } catch (error) {
      console.log('Could not login user', error)
    }
  }

  return (
    <div>
      <div>Email</div>
      <input type='text' value={email} onChange={e => setEmail(e.target.value)}></input>
      <div>password</div>
      <input type='password' value={password} onChange={e => setPassword(e.target.value)}></input>
      <button onClick={handleLogin}>Anmelden</button>
    </div>
  )
}

import { useState } from 'react'
import { useRouter } from 'next/router'
import { login } from '../lib/api/client/clientRequests'
import Layout from '../components/Layout'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
    <Layout title='Shop | Login'>
      <div>
        <div>Email</div>
        <input type='text' value={email} onChange={e => setEmail(e.target.value)}></input>
        <div>password</div>
        <input type='password' value={password} onChange={e => setPassword(e.target.value)}></input>
        <button onClick={handleLogin}>Anmelden</button>
      </div>
    </Layout>
  )
}

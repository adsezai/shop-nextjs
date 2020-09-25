import { NextApiRequest, NextApiResponse } from 'next'
import { login } from '../../lib/api/server/login'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body
    try {
      await login({ email, password })

      // TODO set cookie with Access token and refresh token here
      res.status(200).json({ message: 'ok' })
    } catch (error) {
      // TODO get axios error and return correct code, message
      res.status(500).json({ error: error.message })
    }
  }
}

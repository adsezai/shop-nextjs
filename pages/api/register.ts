import { NextApiRequest, NextApiResponse } from 'next'
import { register } from '../../lib/api/server/login'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, email, password } = req.body
    try {
      await register({ name, email, password })

      res.status(200).json({ message: 'ok' })
      res.end()
    } catch (error) {
      console.log('Error', error.response.statusText)
      // TODO get axios error and return correct code, message
      res.status(401).json({ error: error.message })
      res.end()
    }
  }
}

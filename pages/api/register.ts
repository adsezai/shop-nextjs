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
      res.status(error.code).json({ code: error.code, message: error.message })
    }
  }
}

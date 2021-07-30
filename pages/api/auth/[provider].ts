import { NextApiRequest, NextApiResponse } from 'next'

export default async function authApi(req: NextApiRequest, res: NextApiResponse) {
  const { provider } = req.query

  if (req.method === 'GET') {
    try {
      res.redirect(`${process.env.BACKEND_URL}/auth/${provider}`)
    } catch (error) {
      // TODO handle different error codes
      res.status(error.code).json({ code: error.code, message: error.message })
    }
  }
}

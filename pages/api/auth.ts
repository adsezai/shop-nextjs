import { NextApiRequest, NextApiResponse } from 'next'
import { getItemList } from '../../lib/api/server/items'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      res.redirect(process.env.BACKEND_URL + '/auth/google')
    } catch (error) {
      // TODO handle different error codes
      res.status(error.code).json({ code: error.code, message: error.message })
    }
  }
}

import { NextApiRequest, NextApiResponse } from 'next'
import { getItemList } from '../../lib/api/server/items'

export default async function itemsApi(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { page, limit, filter, coordinates, radius } = req.query
    try {
      const response = await getItemList(page, limit, filter, coordinates, radius)
      res.status(200).json(response)
    } catch (error) {
      res.status(error.code).json({ code: error.code, message: error.message })
    }
  }
}

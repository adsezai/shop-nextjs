import { NextApiRequest, NextApiResponse } from 'next'
import { getItemList } from '../../lib/api/server/items'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { pageNumber, limit, filter, coordinates, radius } = req.body
    try {
      const response = await getItemList(pageNumber, limit, filter, coordinates, radius)
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'e' })
    }
  }
}

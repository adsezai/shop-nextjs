import { NextApiRequest, NextApiResponse } from 'next'
import { getItemList } from '../../lib/api/items'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    console.log('request incoming POST', req.body)
    const { pageNumber, limit, filter, coordinates, radius } = req.body
    try {
      const response = await getItemList(pageNumber, limit, filter, coordinates, radius)
      console.log('res', response)
      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({ error: 'e' })
    }
  }
}

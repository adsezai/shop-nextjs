import { NextApiRequest, NextApiResponse } from 'next'
import { addItem } from '../../lib/api/server/items'
import { tokenNames as n } from '../../lib/global/const'
import * as cookie from 'cookie'

export default async function addItemApi(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body
    const cookies = cookie.parse(req.headers.cookie)
    const accessToken = cookies[n.ACCESS_TOKEN]

    try {
      const item = await addItem(data, accessToken)
      res.status(200).json(item)
      res.end()
    } catch (error) {
      res.status(error.code).json({ code: error.code, message: error.message })
    }
  }
}

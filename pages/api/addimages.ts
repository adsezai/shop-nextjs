import { NextApiRequest, NextApiResponse } from 'next'
import { addItemImageStream } from '../../lib/api/server/items'
import { tokenNames as n } from '../../lib/global/const'
import * as cookie from 'cookie'

export default async function addImagesApi(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { itemid } = req.query

    const cookies = cookie.parse(req.headers.cookie)
    const accessToken = cookies[n.ACCESS_TOKEN]

    try {
      const uploadResult = await addItemImageStream(req, itemid, accessToken)
      res.status(200).json(uploadResult)
    } catch (error) {
      res.status(error.code).json({ code: error.code, message: error.message })
    }
  }
}

export const config = {
  api: {
    bodyParser: false
  }
}

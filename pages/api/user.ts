import { NextApiRequest, NextApiResponse } from 'next'
import { getUserDetails } from '../../lib/api/server/login'
import * as cookie from 'cookie'
import { tokenNames as n } from '../../lib/global/const'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const cookies = cookie.parse(req.headers.cookie)
      const accessToken = cookies[n.ACCESS_TOKEN]

      if (!accessToken) {
        res.status(401)
        res.end()
        return
      }

      let user = await getUserDetails(accessToken)

      res.status(200).json({ data: user })
      res.end()
    } catch (error) {
      if (error.isAxiosError) res.status(error.response.status).json({ error: error.response.data })
      else res.status(500).json({ error: error.message })

      res.end()
    }
  }
}

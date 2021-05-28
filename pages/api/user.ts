import { NextApiRequest, NextApiResponse } from 'next'
import { getUserDetails } from '../../lib/api/server/login'
import * as cookie from 'cookie'
import { tokenNames as n } from '../../lib/global/const'
import { errorUnauthorized } from '../../lib/global/errors'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const cookies = cookie.parse(req.headers.cookie)
      const accessToken = cookies[n.ACCESS_TOKEN]

      accessToken || errorUnauthorized('No cookie provided')

      let user = await getUserDetails(accessToken)

      res.status(200).json({ data: user })
    } catch (error) {
      res.status(error.code).json({ code: error.code, message: error.message })
    }
  }
}

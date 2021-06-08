import { NextApiRequest, NextApiResponse } from 'next'

import { register } from '../../lib/api/server/login'
import { tokenNames as n } from '../../lib/global/const'
import { createCookie } from '../../lib/api/utils'

type Tokens = {
  refreshToken: string
  accessToken: string
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, email, password } = req.body
    try {
      const tokens: Tokens = await register({ name, email, password })

      const accessCookie = createCookie(n.ACCESS_TOKEN, tokens.accessToken)
      //const refreshCookie = createCookie(n.REFRESH_TOKEN, tokens.refreshToken) // TODO Refresh token not send back to path /refresh

      res.setHeader('Set-Cookie', [accessCookie /* refreshCookie*/])
      res.status(200).json({ message: 'ok' })
      res.end()
    } catch (error) {
      res.status(error.code).json({ code: error.code, message: error.message })
    }
  }
}

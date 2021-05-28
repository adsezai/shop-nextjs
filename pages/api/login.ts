import { NextApiRequest, NextApiResponse } from 'next'
import { login } from '../../lib/api/server/login'
import * as cookie from 'cookie'
import { tokenNames as n } from '../../lib/global/const'

interface Tokens {
  refreshToken: string
  accessToken: string
}

function createCookie(name: string, value: string, path?: string): string {
  return cookie.serialize(name, value, {
    httpOnly: true,
    path: path || '/',
    sameSite: 'lax',
    secure: false // TODO change to true (only sends over https if true)
  })
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body
    try {
      const tokens: Tokens = await login({ email, password })

      const accessCookie = createCookie(n.ACCESS_TOKEN, tokens.accessToken)
      //const refreshCookie = createCookie(n.REFRESH_TOKEN, tokens.refreshToken) // TODO Refresh token not send back to path /refresh

      res.setHeader('Set-Cookie', [accessCookie /* refreshCookie*/])
      res.status(200).json({ message: 'ok' })
      res.end()
    } catch (error) {
      console.log('error in API', error.code, error.message)
      res.status(error.code).json({ code: error.code, message: error.message })
    }
  }
}

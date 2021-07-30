import { NextApiRequest, NextApiResponse } from 'next'
import { doGoogleAuth } from '../../../../lib/api/server/login'
import { createCookie } from '../../../../lib/api/utils'
import { tokenNames as n } from '../../../../lib/global/const'

interface Tokens {
  refreshToken: string
  accessToken: string
}

export default async function authApi(req: NextApiRequest, res: NextApiResponse) {
  try {
    const tokens: Tokens = await doGoogleAuth(req.query)

    const accessCookie = createCookie(n.ACCESS_TOKEN, tokens.accessToken)

    res.setHeader('Set-Cookie', [accessCookie])

    res.redirect('/')
  } catch (error) {
    // TODO handle different error codes
    res.status(error.code).json({ code: error.code, message: error.message })
  }
}

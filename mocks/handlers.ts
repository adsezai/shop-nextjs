import { rest } from 'msw'
import { createURL } from '../lib/api/utils'
import { login } from './db'

export const handlers = [
  rest.get(createURL('/api/user'), (req, res, ctx) => {
    return res(ctx.json(login.sucess))
  })
]

import { rest } from 'msw'
import { createURL } from '../lib/api/utils'
import { login, item } from './db'
import { times, random } from 'lodash'

export const handlers = [
  rest.get(createURL('/api/user'), (req, res, ctx) => {
    return res(ctx.json(login.sucess))
  }),
  /* mock Items for frontend and backend */
  rest.get(createURL('/api/items'), (req, res, ctx) => {
    return res(ctx.json(times(random(1, 10), item)))
  }),
  rest.post(process.env.BACKEND_URL + '/items/page', (req, res, ctx) => {
    return res(ctx.json(times(random(1, 10), item)))
  })
]

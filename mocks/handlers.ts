import { rest } from 'msw'
import { createURL } from '../lib/api/utils'
import { login, item, user } from './db'
import { times, random } from 'lodash'

export const handlers = [
  rest.get(createURL('/api/user'), (req, res, ctx) => {
    return res(ctx.json(login.sucess))
  }),
  /* mock Items for frontend and backend */

  rest.get(createURL('/api/items'), (req, res, ctx) => {
    const limit = parseInt(req.url.searchParams.get('limit'))
    return res(ctx.json(times(limit || random(1, 10), item)))
  }),

  rest.post(process.env.BACKEND_URL + '/items/page', (req, res, ctx) => {
    const limit = req.body['searchOptions']['limit']

    return res(ctx.json(times(limit || random(1, 10), item)))
  }),
  // single item
  rest.get(process.env.BACKEND_URL + '/items/item/*', (req, res, ctx) => {
    return res(ctx.json(item()))
  }),
  // user
  rest.get(process.env.BACKEND_URL + '/users/user/*', (req, res, ctx) => {
    return res(ctx.json(user()))
  })
]

import { rest } from 'msw'
import { createURL } from '../lib/api/utils'

import { login } from '../mocks/db'
import { server } from '../mocks/server'
import { SWRConfig, cache } from 'swr'

/* 
Re-require modules because the modules keeps the states of the previous test (lazy loaded components)
The test results are not consistent in this case. See link below for details  
https://github.com/testing-library/react-testing-library/issues/716#issuecomment-688120431

*/
describe('Test the Navbar Compoennt', () => {
  let cleanup
  let Navbar
  let waitFor
  let render
  let screen
  let React

  beforeEach(() => {
    jest.resetModules()

    Navbar = require('../components/Navbar').default
    React = require('react')
    ;({ waitFor, render, screen, cleanup } = require('./test-utils'))
    cache.clear()
  })

  afterEach(() => {
    cleanup()
  })

  test('it should render the Login Name on successfull login', async () => {
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <Navbar />
      </SWRConfig>
    )

    await waitFor(() => {
      expect(screen.getByText(login.sucess.data.firstname)).toBeInTheDocument()
    })
  })

  test('it should render the "Login" Button on error', async () => {
    server.use(
      rest.get(createURL('/api/user'), (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <Navbar />
      </SWRConfig>
    )

    await waitFor(
      () => {
        expect(screen.getByText('Login')).toBeInTheDocument()
      },
      { timeout: 30000 }
    )
  })
})

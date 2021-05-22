import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { server } from '../mocks/server'
import { cache } from 'swr'

// setup fetch for node environment
require('isomorphic-fetch')

// Establish API mocking before all tests.
beforeAll(() => server.listen())

afterEach(() => {
  // clear cache for swr requests
  cache.clear()
  // Reset any request handlers that may be added during the tests
  server.resetHandlers()
})
// Clean up after the tests are finished.
afterAll(() => server.close())

//jest.setTimeout(10000)

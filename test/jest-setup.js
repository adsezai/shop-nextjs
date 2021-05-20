import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { server } from '../mocks/server'

// setup fetch for node environment
require('isomorphic-fetch')

// Establish API mocking before all tests.
beforeAll(() => server.listen())
// Reset any request handlers that may be added during the tests
afterEach(() => server.resetHandlers())
// Clean up after the tests are finished.
afterAll(() => server.close())

import { rest } from 'msw'

import { render, screen, waitFor, fireEvent } from './test-utils'
import { server } from '../mocks/server'
import { createURL } from '../lib/api/utils'
import Login from '../pages/login'
import i18nLogin from '../locales/de/login.json'

const TEST_EMAIL = 'test@test.de'
const TEST_PASSWORD = 'sUpErSecRET..!$'

describe('Test the Login', () => {
  test('it should disable the login button if email and passwort are not set', () => {
    render(<Login></Login>)

    expect(screen.getByRole('button', { name: i18nLogin.login })).toBeDisabled()
  })

  test('it should disable the login button if only email is set', () => {
    render(<Login></Login>)

    const emailInput = screen.getByPlaceholderText(i18nLogin.email)

    fireEvent.change(emailInput, { target: { value: TEST_EMAIL } })

    expect(screen.getByRole('button', { name: i18nLogin.login })).toBeDisabled()
  })

  test('it should disable the login button if only password is set', () => {
    render(<Login></Login>)

    const passwordInput = screen.getByPlaceholderText(i18nLogin.password)

    fireEvent.change(passwordInput, { target: { value: TEST_PASSWORD } })

    expect(screen.getByRole('button', { name: i18nLogin.login })).toBeDisabled()
  })

  test('it should enable the login button if email and password are set', () => {
    render(<Login></Login>)

    const emailInput = screen.getByPlaceholderText(i18nLogin.email)
    const passwordInput = screen.getByPlaceholderText(i18nLogin.password)

    fireEvent.change(emailInput, { target: { value: TEST_EMAIL } })
    fireEvent.change(passwordInput, { target: { value: TEST_PASSWORD } })

    expect(screen.getByRole('button', { name: i18nLogin.login })).not.toBeDisabled()
  })

  test('it should show a error message on 401 unauthorized response', async () => {
    server.use(
      rest.post(createURL('/api/login'), (req, res, ctx) => {
        return res(ctx.status(401))
      })
    )

    render(<Login></Login>)

    submitLogin(TEST_EMAIL, TEST_PASSWORD)

    await waitFor(() => {
      expect(screen.getByText(i18nLogin.unauthorized)).toBeInTheDocument()
    })
  })

  test('it should show a error message on 500 internal response', async () => {
    server.use(
      rest.post(createURL('/api/login'), (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    render(<Login></Login>)

    submitLogin(TEST_EMAIL, TEST_PASSWORD)

    await waitFor(() => {
      expect(screen.getByText(i18nLogin.internal)).toBeInTheDocument()
    })
  })
})

function submitLogin(username, password) {
  const emailInput = screen.getByPlaceholderText(i18nLogin.email)
  const passwordInput = screen.getByPlaceholderText(i18nLogin.password)
  const submitButton = screen.getByRole('button', { name: i18nLogin.login })

  fireEvent.change(emailInput, { target: { value: username } })
  fireEvent.change(passwordInput, { target: { value: password } })
  fireEvent.click(submitButton)
}

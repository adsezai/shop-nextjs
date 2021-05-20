import { waitFor, render, screen } from './test-utils'
import Navbar from '../components/Navbar'
import { login } from '../mocks/db'

describe('Test the Navbar component', () => {
  test('it should render the Login Name on successfull login', async () => {
    render(<Navbar />)

    await waitFor(() => {
      expect(screen.getByText(login.sucess.data.firstname)).toBeInTheDocument()
    })
  })
})

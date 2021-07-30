import { rest } from 'msw'

import { render, screen, waitFor, fireEvent, waitForElementToBeRemoved, queryByText } from './test-utils'
//import user from '@testing-library/user-event'
import { server } from '../mocks/server'
import { createURL } from '../lib/api/utils'
import Sell from '../pages/sell'
import i18nSell from '../locales/de/sell.json'
import { queryByTestId } from '@testing-library/react'

function fillForm() {
  const inputTitle = screen.getByLabelText(i18nSell.titleInput)
  fireEvent.change(inputTitle, { target: { value: 'Test' } })

  const inputPrice = screen.getByLabelText(i18nSell.priceInput)
  fireEvent.change(inputPrice, { target: { value: 20 } })

  const inputDesc = screen.getByLabelText(i18nSell.descriptionInput)
  fireEvent.change(inputDesc, { target: { value: 'A product for testing' } })

  const inputLocation = screen.getByLabelText(i18nSell.locationInput)
  fireEvent.change(inputLocation, { target: { value: 'Ulm' } })

  const file = new File(['(⌐□_□)'], 'Download.png', {
    type: 'image/png',
    lastModified: 1623259250223
  })

  //const inputFile = screen.getByTestId('imageupload')
  //user.upload(inputFile, file)

  //const inputFile = screen.getByTestId('imageupload')
  //fireEvent.change(inputFile, { target: { file: [file] } })
}

function submitForm() {
  const submitButton = screen.getByRole('button', { name: i18nSell.publish })

  fireEvent(
    submitButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    })
  )
}

describe('Test the sell page modal', () => {
  global.URL.createObjectURL = jest.fn(x => 'mockedUrl')
  global.URL.revokeObjectURL = jest.fn()

  it('should show loading modal and success if requests were successful', async () => {
    server.use(
      rest.post(createURL('/api/additem'), (req, res, ctx) => {
        return res(ctx.json({ _id: '123' }))
      }),
      rest.post(createURL('/api/addimages'), (req, res, ctx) => {
        return res(ctx.json({ message: 'ok' }))
      })
    )

    render(<Sell inputsRequired={false} />)
    fillForm()
    submitForm()

    await screen.findByText(i18nSell.addItemLoading)
    await screen.findByText(i18nSell.addItemSuccess)
    const modal = screen.queryByTestId('sell-modal')
    expect(modal).toBeInTheDocument()
  })

  it('should show loading modal then error if add item data failed', async () => {
    server.use(
      rest.post(createURL('/api/additem'), (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    render(<Sell inputsRequired={false} />)
    fillForm()
    submitForm()

    await screen.findByText(i18nSell.addItemLoading)
    await screen.findByText(i18nSell.addItemError)

    const modal = screen.queryByTestId('sell-modal')
    expect(modal).not.toBeInTheDocument()
  })

  it('should show loading modal then error if add image upload failed', async () => {
    server.use(
      rest.post(createURL('/api/additem'), (req, res, ctx) => {
        return res(ctx.json({ _id: '123' }))
      }),
      rest.post(createURL('/api/addimages'), (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    render(<Sell inputsRequired={false} />)
    fillForm()
    submitForm()

    await screen.findByText(i18nSell.addItemLoading)
    await screen.findByText(i18nSell.addItemError)

    const modal = screen.queryByTestId('sell-modal')
    expect(modal).not.toBeInTheDocument()
  })
})

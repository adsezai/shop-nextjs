import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme as themeObj } from '../styles/theme'

import I18nProvider from 'next-translate/I18nProvider'

import cfg from '../i18n.json'
// TODO dynamically import this
import common from '../locales/de/common.json'
import home from '../locales/de/home.json'
import login from '../locales/de/login.json'
import sell from '../locales/de/sell.json'

// Wrap Components in Providers here (ReduxProvider, ThemeProvider, etc)
const Providers = ({ children }) => {
  return (
    <I18nProvider config={cfg} lang={'de'} namespaces={{ common, home, login, sell }}>
      <ThemeProvider theme={themeObj}>{children}</ThemeProvider>
    </I18nProvider>
  )
}

const customRender = (ui, options = {}) => render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }

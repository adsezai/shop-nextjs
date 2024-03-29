import { AppProps } from 'next/app'
import Error from 'next/error'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { darkTheme, theme } from '../styles/theme'

import '../styles/reset.css'
import '../styles/global.css'
import 'swiper/swiper-bundle.min.css'

console.log('NEXT_PUBLIC_API_MOCKING is enabled:', process.env.NEXT_PUBLIC_API_MOCKING === 'enabled')
if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks/index')
}

export default function App({ Component, pageProps }: AppProps) {
  // TODO handle error in component?
  if (pageProps.error) {
    return <Error statusCode={pageProps.error.statusCode} title={pageProps.error.message} />
  }
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'></meta>
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

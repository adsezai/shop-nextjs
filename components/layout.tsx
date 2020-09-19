import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Navbar from './navbar'

const name = '[Your Name]'
export const siteTitle = 'Shop'

export default function Layout({ children }: { children: React.ReactNode; home?: boolean }) {
  return (
    <div>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content='Item Page' />
        <meta
          property='og:image'
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name='og:title' content={siteTitle} />
      </Head>
      <Navbar></Navbar>
      <main className={styles.container}>{children}</main>
      <footer></footer>
    </div>
  )
}

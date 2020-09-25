import { useState } from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import * as cookie from 'cookie'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Itemcard from '../components/itemcard'
import Cardgrid from '../components/cardgrid'
import utilStyles from '../styles/utils.module.css'
import { getItemList } from '../lib/api/server/items'
import { Item } from '../lib/common/item.interface'
import axios from 'axios'

interface Props {
  itemProps: Array<Item>
}
export default function Home({ itemProps }: Props) {
  const [items, setItems] = useState(itemProps)
  let [pageNumber, setPageNumber] = useState(1)

  const handleLoadMore = async () => {
    const res = await axios.post(
      'http://localhost:3000/api/items',
      {
        pageNumber: pageNumber,
        limit: 5
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const newItems = res.data

    setPageNumber(p => ++p)
    setItems([...items, ...newItems])
  }

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div style={{ maxWidth: '900px' }}>
        <Cardgrid>
          {items.map(item => (
            <Itemcard item={item}></Itemcard>
          ))}
        </Cardgrid>
      </div>
      <button onClick={handleLoadMore}>Load More</button>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  let items: null | Array<Item> = null
  //const cookies = cookie.parse(req.headers.cookie)
  // TODO check if jwt token should be in http cookie or header or only refresh token should be in httpcookie
  //const jwt = cookies['ACCESS_TOKEN']
  // make request with access token
  // if fails
  //    if no refresh token => send 401
  //    if refreshtoken is provided => generate new tokens and do request again and send new tokens to client

  /* const cookieSerialized = cookie.serialize('REFRESH_JWT', 'HalloRefreshJwt', {
    httpOnly: true,
    path: '/'
  })
  res.setHeader('Set-Cookie', cookieSerialized) */

  try {
    items = await getItemList(0, 5, null, null, null)
  } catch (error) {}
  return {
    props: {
      itemProps: items
    }
  }
}

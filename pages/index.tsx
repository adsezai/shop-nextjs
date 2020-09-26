import { useState } from 'react'
import { GetServerSideProps } from 'next'
import * as cookie from 'cookie'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Itemcard from '../components/itemcard'
import Cardgrid from '../components/cardgrid'

import { getItemList } from '../lib/api/server/items'
import { Item } from '../lib/common/item.interface'
import { User } from '../lib/common/user.interface'
import { tokenNames as n } from '../lib/global/const'
import axios from 'axios'
import { getUserDetails } from '../lib/api/server/login'

interface Props {
  itemProps: Array<Item>
  user: User
}
export default function Home({ itemProps, user }: Props) {
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
    <Layout user={user}>
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
  const cookies = cookie.parse(req.headers.cookie)
  const accessToken = cookies[n.ACCESS_TOKEN]

  let user = null
  try {
    user = await getUserDetails(accessToken)
    console.log('user', user)
  } catch (error) {
    // TODO got error 403 forbidden, change to 401 and check for other errors as well
    console.log('Error get user details: ', error)
  }

  try {
    items = await getItemList(0, 5, null, null, null)
  } catch (error) {}
  return {
    props: {
      itemProps: items,
      user: user
    }
  }
}

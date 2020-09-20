import { useState } from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Itemcard from '../components/itemcard'
import Cardgrid from '../components/cardgrid'
import utilStyles from '../styles/utils.module.css'
import { getItemList } from '../lib/api/items'
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
      <section className={utilStyles.headingMd}>
        <p>Home</p>
      </section>
      <Cardgrid>
        {items.map(item => (
          <Itemcard item={item}></Itemcard>
        ))}
      </Cardgrid>
      <button onClick={handleLoadMore}>Load More</button>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let items: null | Array<Item> = null

  try {
    items = await getItemList(0, 5, null, null, null)
  } catch (error) {}
  return {
    props: {
      itemProps: items
    }
  }
}

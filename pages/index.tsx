import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getItemList } from '../lib/api/items'
import { Item } from '../lib/common/item.interface'

interface Props {
  items: Array<Item>
}
export default function Home({ items }: Props) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Home</p>
      </section>
      {items.map(item => (
        <div>
          <Link href={`/i/${item._id}`}>
            <a>{item.title}</a>
          </Link>
        </div>
      ))}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let items: null | Array<Item> = null

  try {
    items = await getItemList(0, 20, null, null, null)
  } catch (error) {}
  return {
    props: {
      items
    }
  }
}

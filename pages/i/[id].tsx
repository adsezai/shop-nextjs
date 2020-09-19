import { GetServerSideProps } from 'next'
import Layout from '../../components/layout'
import { getItem } from '../../lib/api/items'
import { Item } from '../../lib/common/item.interface'
import Date from '../../components/date'
import styles from './id.module.css'

interface Props {
  item: Item
}

export default function ItemPage({ item }: Props) {
  return (
    <>
      <Layout>
        <div className={styles.imagewrapper}>
          <div>image here</div>
        </div>
        <div>Title: {item.title}</div>
        <div>Price: {item.price} €</div>
        <Date dateString={item.createDate}></Date>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params
  let item: null | Item = null

  try {
    item = await getItem(id)
  } catch (error) {}

  return {
    props: {
      item: item
    }
  }
}

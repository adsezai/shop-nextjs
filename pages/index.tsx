import { useState } from 'react'
import { GetServerSideProps } from 'next'

import Layout from '../components/Layout'
import Itemcard from '../components/Itemcard'
import Cardgrid from '../components/Cardgrid'
import Button, { ButtonSize } from '../components/Button'

import { getItemList } from '../lib/api/server/items'
import { fetchItems } from '../lib/api/client/clientRequests'
import { Item } from '../lib/common/item.interface'
import { User } from '../lib/common/user.interface'

import styled from 'styled-components'

interface Props {
  itemProps: Array<Item>
  user: User
}

export default function Home({ itemProps }: Props) {
  const [items, setItems] = useState(itemProps)
  const [pageNumber, setPageNumber] = useState(1)

  const handleLoadMore = async () => {
    const newItems = await fetchItems(pageNumber, 5)
    // TODO handle last page
    setPageNumber(p => ++p)

    setItems([...items, ...newItems])
  }

  return (
    <>
      <Layout title='Shop'>
        <Cardgrid>{items && items.map(item => <Itemcard item={item}></Itemcard>)}</Cardgrid>
        <StyledContainer>
          <Button text='Load more' size={ButtonSize.Auto} onClick={handleLoadMore}></Button>
        </StyledContainer>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
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

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25px 0 40px 0;
`

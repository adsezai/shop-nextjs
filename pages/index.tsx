import { GetServerSideProps } from 'next'
import styled from 'styled-components'
import { useSWRInfinite } from 'swr'

import Layout from '../components/Layout'
import Itemcard from '../components/Itemcard'
import Cardgrid from '../components/Cardgrid'
import Button, { ButtonSize } from '../components/Button'

import { createURL } from '../lib/api/utils'
import { getItemList } from '../lib/api/server/items'
import { fetcher } from '../lib/api/client/clientRequests'

import { Item } from '../lib/common/item.interface'
import { User } from '../lib/common/user.interface'

const PAGE_LIMIT = 2

const getKey = (pageIndex, previousePageData) => {
  if (previousePageData && !previousePageData.length) return null
  return createURL(`/api/items?page=${pageIndex + 1}&limit=${PAGE_LIMIT}`)
}

interface Props {
  itemProps: Array<Item>
  user: User
}

export default function Home({ itemProps }: Props) {
  const { data, size, setSize, isValidating } = useSWRInfinite(getKey, fetcher, { initialData: [itemProps] })

  const noData = data?.[0]?.length === 0
  const reachedEnd = noData || (data && data[data.length - 1]?.length < PAGE_LIMIT)
  const isRefreshing = isValidating && data && data.length === size
  const isLoadingMore = size > 0 && data && typeof data[size - 1] === 'undefined'

  if (!data) return 'loading'

  return (
    <>
      <Layout title='Shop'>
        <Cardgrid>
          {data.map((items, index) => {
            return items.map(i => <Itemcard key={i.id} item={i}></Itemcard>)
          })}
        </Cardgrid>
        <StyledContainer>
          <Button
            disabled={reachedEnd || isRefreshing || isLoadingMore}
            text={reachedEnd ? 'No more Data' : 'Load more'}
            size={ButtonSize.Auto}
            onClick={() => setSize(size + 1)}
          ></Button>
        </StyledContainer>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  let items: null | Array<Item> = null
  try {
    items = await getItemList(0, PAGE_LIMIT, null, null, null)
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

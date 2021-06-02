import { GetServerSideProps } from 'next'
import styled from 'styled-components'

import Layout from '../../components/Layout'
import ImageBox from '../../components/ImageBox'
import { getItem } from '../../lib/api/server/items'
import { getUserInfo } from '../../lib/api/server/User'
import { Item } from '../../lib/common/item.interface'
import { User } from '../../lib/common/user.interface'
import {
  CENTER_HORIZONTALLY,
  CenterHorizontally,
  CenterVertically,
  Box,
  Text,
  Space,
  SpaceSize
} from '../../styles/utils'

interface Props {
  item: Item
  user: User
}

// TODO Handle case if request to item or user had an error
export default function ItemPage({ item, user }: Props) {
  return (
    <>
      <Layout title={`Shop | ${item.title}`}>
        <ItemContainer margin='0 auto' flexDirection='column'>
          <ResponsiveBox resWidth='47%' flexDirection='column'>
            <ImageBox></ImageBox>
          </ResponsiveBox>
          <ResponsiveBox resWidth='6%'></ResponsiveBox>
          <ResponsiveBox resWidth='47%' flexDirection='column' flex='1 1 auto'>
            <Text fontWeight='bold' fontSize='xl'>
              {item.title}
            </Text>
            <Text fontSize='xl' marginTop='3px' fontWeight='bold'>
              {item.price} €
            </Text>
            <Text fontSize='m'>{item.location}</Text>
            <Text fontSize='m'>{item.description}</Text>
            <Space x={SpaceSize.large} y={SpaceSize.large}></Space>
            <StyledContact>
              <HrDivider />
              <CenterHorizontally>
                <CenterHorizontally>
                  <StyledImage src='https://picsum.photos/40/40' alt='img' />
                </CenterHorizontally>
                <Box flexDirection='column'>
                  <Text m='0' fontWeight='bold'>
                    {user.firstname}
                  </Text>
                  <Text m='0'>{user.email}</Text>
                </Box>
              </CenterHorizontally>
              <HrDivider />
            </StyledContact>
          </ResponsiveBox>
        </ItemContainer>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params
  let item: null | Item = null
  let user: null | User = null

  try {
    item = await getItem(id)
    user = await getUserInfo(item.owner)
  } catch (error) {
    console.log('Cloud not get item ', error.message)
  }

  return {
    props: {
      item: item,
      user: user
    }
  }
}

const ResponsiveBox = styled(Box)<{ resWidth: string }>`
  margin: 10px 0;
  @media screen and (min-width: ${props => props.theme.breakpoints.laptop}) {
    width: ${props => props.resWidth};
  }
`

const ItemContainer = styled(Box)`
  @media (max-width: ${props => props.theme.breakpoints.laptop}) {
    max-width: 700px;
  }
  @media screen and (min-width: ${props => props.theme.breakpoints.laptop}) {
    flex-direction: row;
  }
`

const StyledContact = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
`

const HrDivider = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid rgb(222, 225, 222);
  margin: 1em 0;
  padding: 0;
`

const StyledImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-right: 15px;
`

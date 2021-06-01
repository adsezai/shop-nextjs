import { GetServerSideProps } from 'next'
import Layout from '../../components/Layout'
import ImageBox from '../../components/ImageBox'
import { getItem } from '../../lib/api/server/items'
import { getUserInfo } from '../../lib/api/server/User'
import { Item } from '../../lib/common/item.interface'
import { User } from '../../lib/common/user.interface'
import { CENTER_HORIZONTALLY, CenterHorizontally, CenterVertically, Box, Text } from '../../styles/utils'

import user from '../api/user'

import styled from 'styled-components'

interface Props {
  item: Item
  user: User
}

// TODO Handle case if request to item or user had an error
export default function ItemPage({ item, user }: Props) {
  return (
    <>
      <Layout title={`Shop | ${item.title}`}>
        <Box flexDirection='column'>
          <ImageBox></ImageBox>
          <Box flexDirection='column'>
            <Text fontWeight='bold' fontSize='xl'>
              {item.title}
            </Text>
            <Text fontSize='l'>{item.price} €</Text>
            <Text fontSize='m'>Location</Text>

            <StyledContact>
              <HrDivider />
              <CenterHorizontally>
                <CenterHorizontally>
                  <StyledImage src='https://picsum.photos/40/40' alt='img' />
                </CenterHorizontally>

                <StyledProfileInfo>
                  <div>
                    {user.firstname} {user.lastname}
                  </div>
                  <div>{user.email}</div>
                </StyledProfileInfo>
              </CenterHorizontally>
              <StyledContactApps>
                <StyledContactIcon>
                  <img src='/images/phone.svg' alt='Phone' />
                </StyledContactIcon>
                <StyledContactIcon>
                  <img src='/images/viber.svg' alt='Viber' />
                </StyledContactIcon>
                <StyledContactIcon>
                  <img src='/images/whatsapp.svg' alt='WhatsApp' />
                </StyledContactIcon>
                <StyledContactIcon>
                  <img src='/images/messenger.svg' alt='Messenger' />
                </StyledContactIcon>
              </StyledContactApps>
              <HrDivider />
            </StyledContact>
          </Box>
        </Box>
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

const StyledContact = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  margin-top: 15px;
`

const StyledText = styled.div`
  max-width: 100%;
  overflow-wrap: break-word;
  font-weight: 500;
  font-size: 22px;
  line-height: 36px;
`

const HrDivider = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid rgb(222, 225, 222);
  margin: 1em 0;
  padding: 0;
`
const StyledContactIcon = styled.div`
  ${CENTER_HORIZONTALLY}
  padding: 5px;
  width: 50px;
  height: 50px;
`
const StyledContactApps = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  margin: 20px 0;
`

const StyledImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-right: 15px;
`

const StyledProfileInfo = styled.div`
  font-size: 18px;
  line-height: 1.3;
  font-weight: normal;
`

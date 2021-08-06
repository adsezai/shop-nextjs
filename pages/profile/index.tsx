import { GetServerSideProps } from 'next'
import styled from 'styled-components'
import * as cookie from 'cookie'

import Layout from '../../components/Layout'
import { Box, Space, SpaceSize, Text, CenterHorizontally } from '../../styles/utils'
import Input from '../../components/Input'
import { tokenNames as n } from '../../lib/global/const'
import { getUserDetails } from '../../lib/api/server/login'
import { User } from '../../lib/common/user.interface'
import { useState } from 'react'

const DEFAULT_PICTURE = '/icons/person.svg'

export default function Profile({ user }: { user: User }) {
  const [name, setName] = useState(user.firstname)
  const [email, setEmail] = useState(user.email)
  const [phoneNumber, setPhoneNumber] = useState(user.phone)

  return (
    <Layout title={`Shop | Profile`}>
      <Box flexDirection='column' m='0 auto'>
        <Box mb='25px'>
          <CenterHorizontally>
            <CenterHorizontally>
              <StyledImageSmall src={user?.picture?.url || DEFAULT_PICTURE} alt='img' />
            </CenterHorizontally>
            <Box flexDirection='column' ml='15px'>
              <Text m='0' fontWeight='bold' fontSize='20px' lineHeight='1'>
                {user.firstname}
              </Text>
              <Text mt='2px' lineHeight='1' fontWeight='300'>
                {user.email}
              </Text>
            </Box>
          </CenterHorizontally>
        </Box>
        <Box>
          <Navigation>
            <Item>Meine Produkte</Item>
            <Item>Nachrichten</Item>
            <Item>Favoriten</Item>
            <Item active={true}>Settings</Item>
          </Navigation>
          <Space y={SpaceSize.medium} x={SpaceSize.large}></Space>
          <Space y={SpaceSize.medium} x={SpaceSize.large}></Space>
          <Space y={SpaceSize.medium} x={SpaceSize.large}></Space>
          <StyledSettingContainer>
            <Box flexDirection='column'>
              <Box justifyContent='center'>
                <Box flexDirection='column' alignItems='center' justifyContent='flex-start'>
                  <StyledImage src={user?.picture?.url || DEFAULT_PICTURE} alt='img' />
                </Box>
              </Box>
            </Box>
            <Input label='Name' value={name} onChange={e => setName(e.target.value)} />
            <Input label='E-Mail' readOnly={true} value={email} />
            <Input label='Phone Number' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
          </StyledSettingContainer>
        </Box>
      </Box>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  let user = null
  try {
    // get auth cookie
    const cookies = cookie.parse(req.headers.cookie)
    const accessToken = cookies[n.ACCESS_TOKEN]

    user = await getUserDetails(accessToken)
  } catch (err) {
    console.log('Error getting user ')
    // error something went wrong => redirect to login
  }
  return {
    props: {
      user
    }
  }
}

const StyledSettingContainer = styled(Box)`
  flex-direction: column;
  flex-grow: 1;
  & > *:not(:last-child) {
    margin-bottom: 10px;
  }
`

const Item = styled.div<{ active?: boolean }>`
  font-weight: ${props => (props.active ? '600' : 'normal')};
  background-color: ${props => (props.active ? props.theme.colors.background.nav : 'transparent')};
  padding: 6px 10px;
  border-radius: ${props => props.theme.borderRadiuses.pill};
`

const Navigation = styled(Box)`
  flex-direction: column;
`

// TODO this is also in item page , refactor
const StyledImage = styled.img`
  height: 180px;
  width: 180px;
  border-radius: 50%;
  background-color: lightgrey;
`

const StyledImageSmall = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: lightgrey;
`

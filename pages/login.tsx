import { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import useTranslation from 'next-translate/useTranslation'

import { login } from '../lib/api/client/clientRequests'
import Layout from '../components/Layout'
import Input from '../components/Input'
import { FacebookAuthButton, GoogleAuthButton, AuthButton } from '../components/AuthButton'
import { Space, SpaceSize, Box } from '../styles/utils'

export default function Login() {
  const { t, lang } = useTranslation('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    try {
      await login(email, password)
      router.push('/')
    } catch (error) {
      console.log('Could not login user', error)
    }
  }

  return (
    <Layout title='Shop | Login'>
      <Body>
        {t('title')}
        <StyledWrapper>
          <LoginContainer>
            <ResponsiveBox width='47%' direction='column'>
              <Input
                type='text'
                placeholder={t('email')}
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value)}
              ></Input>
              <Space y={SpaceSize.small}></Space>
              <Input
                type='password'
                placeholder={t('password')}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value)}
              ></Input>
              <Space y={SpaceSize.small}></Space>
              <AuthButton href='' value={t('login')}></AuthButton>
            </ResponsiveBox>
            <ResponsiveBox width='6%'></ResponsiveBox>
            <ResponsiveBox width='47%'>
              <StyledSocialSignin>
                <GoogleAuthButton href='' value={t('socialAuth', { social: 'Google' })}></GoogleAuthButton>
                <Space y={SpaceSize.xs}></Space>
                <FacebookAuthButton href='' value={t('socialAuth', { social: 'Facebook' })}></FacebookAuthButton>
              </StyledSocialSignin>
            </ResponsiveBox>
          </LoginContainer>
        </StyledWrapper>
      </Body>
    </Layout>
  )
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 715px;
  margin: 0 auto;
  padding: 16px;
`

const StyledWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  width: 100%;
`

const ResponsiveBox = styled(Box)`
  margin: 10px 0;
  @media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
    width: ${props => props.width};
  }
`

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  flex-grow: 1;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: row;
  }
`

const StyledSocialSignin = styled.div`
  dispay: flex;
  flex-direction: column;
  flex-grow: 1;
`

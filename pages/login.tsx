import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import useTranslation from 'next-translate/useTranslation'

import { login } from '../lib/api/client/clientRequests'
import Layout from '../components/Layout'
import Input from '../components/Input'
import { FacebookAuthButton, GoogleAuthButton, AuthButton } from '../components/AuthButton'
import { Space, SpaceSize, Box } from '../styles/utils'

export default function Login() {
  const { t } = useTranslation('login')
  const router = useRouter()

  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<boolean | any>(false)

  useEffect(() => {
    setError(false)
  }, [isRegister])

  const handleLogin = async e => {
    e.preventDefault()
    try {
      setLoading(true)
      await login(email, password)
      setLoading(false)
      router.push('/')
    } catch (error) {
      setLoading(false)
      setError(error.code === 401 ? t('unauthorized') : t('internal'))
    }
  }

  return (
    <Layout title='Shop | Login'>
      <Body>
        {isRegister ? t('register') : t('title')}
        <StyledWrapper>
          <LoginContainer>
            <ResponsiveBox width='47%' direction='column'>
              <form onSubmit={handleLogin}>
                {isRegister && (
                  <>
                    <Input
                      type='text'
                      placeholder={t('name')}
                      value={name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setName(e.target.value)}
                    ></Input>
                    <Space y={SpaceSize.small}></Space>
                  </>
                )}
                <Input
                  type='email'
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
                <Box justify={'flex-end'}>
                  <StyledHint>{isRegister ? t('alreadyRegistered') : t('notRegistered')}</StyledHint>
                  <StyledTextButton type='button' onClick={() => setIsRegister(isRegister => !isRegister)}>
                    {isRegister ? t('login') : t('register')}
                  </StyledTextButton>
                </Box>
                <Space y={SpaceSize.xxs}></Space>
                <StyledError>{error && error}</StyledError>
                <Space y={SpaceSize.xxs}></Space>
                <AuthButton
                  disabled={loading || email === '' || password === '' || (isRegister ? name === '' : false)}
                  value={isRegister ? t('register') : t('login')}
                ></AuthButton>
              </form>
            </ResponsiveBox>
            <ResponsiveBox width='6%'></ResponsiveBox>
            <ResponsiveBox width='47%'>
              <StyledSocialSignin>
                <GoogleAuthButton href='/api/auth' value={t('socialAuth', { social: 'Google' })}></GoogleAuthButton>
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

const StyledTextButton = styled.button`
  border: none;
  outline: none;
  background: none;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: #48bb78;
  cursor: pointer;
  text-decoration: underline;
`

const StyledHint = styled.div`
  font-size: ${props => props.theme.fontSizes.small};
  :empty::after {
    content: '.';
    visibility: hidden;
  }
`

const StyledError = styled(StyledHint)`
  color: ${props => props.theme.colors.text.error};
`

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

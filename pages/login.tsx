import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import useTranslation from 'next-translate/useTranslation'

import { login, register } from '../lib/api/client/clientRequests'
import Layout from '../components/Layout'
import Input from '../components/Input'
import { FacebookAuthButton, GoogleAuthButton, AuthButton } from '../components/AuthButton'
import { Space, SpaceSize, Box, Text } from '../styles/utils'

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
      isRegister ? await register(name, email, password) : await login(email, password)
      setLoading(false)
      /*
       * //TODO
       * show hint if register was sucessfull. User must login again after register
       * or login user directly after register
       */
      router.push('/')
    } catch (error) {
      setLoading(false)
      setError(error.code === 401 ? t('unauthorized') : t('internal'))
    }
  }

  return (
    <Layout title='Shop | Login'>
      <Box maxWidth='750px' flexDirection='column' m='0 auto' p='16px'>
        <Text fontSize='l' fontWeight='semibold' mt='0'>
          {isRegister ? t('register') : t('title')}
        </Text>
        <StyledWrapper>
          <LoginContainer>
            <ResponsiveBox resWidth='47%' flexDirection='column'>
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
                <Box justifyContent='flex-end'>
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
            <ResponsiveBox resWidth='6%'></ResponsiveBox>
            <ResponsiveBox resWidth='47%'>
              <StyledSocialSignin>
                <GoogleAuthButton href='/api/auth' value={t('socialAuth', { social: 'Google' })}></GoogleAuthButton>
                <Space y={SpaceSize.xs}></Space>
                <FacebookAuthButton href='' value={t('socialAuth', { social: 'Facebook' })}></FacebookAuthButton>
              </StyledSocialSignin>
            </ResponsiveBox>
          </LoginContainer>
        </StyledWrapper>
      </Box>
    </Layout>
  )
}

const StyledTextButton = styled.button`
  border: none;
  outline: none;
  background: none;
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.s};
  color: #48bb78;
  cursor: pointer;
  text-decoration: underline;
  padding: 0 6px;
`

const StyledHint = styled.div`
  font-size: ${props => props.theme.fontSizes.s};
  :empty::after {
    content: '.';
    visibility: hidden;
  }
`

const StyledError = styled(StyledHint)`
  color: ${props => props.theme.colors.text.error};
`

const StyledWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  width: 100%;
`

const ResponsiveBox = styled(Box)<{ resWidth: string }>`
  margin: 10px 0;
  @media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
    width: ${props => props.resWidth};
  }
`

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

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

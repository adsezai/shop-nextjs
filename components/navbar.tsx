import Link from 'next/link'
import styled from 'styled-components'
import useTranslation from 'next-translate/useTranslation'

import { useUser } from '../lib/api/client/clientRequests'
import Button, { ButtonSize } from './Button'

export default function Navbar() {
  const { t } = useTranslation('common')
  // user and error can exist on the same time
  const { user, isLoading, isError, mutate } = useUser()

  return (
    <StyledNav>
      <StyledContainer>
        <LeftNav>
          <Link href={'/'}>
            <StyledA>SHOP</StyledA>
          </Link>
        </LeftNav>
        <RightNav>
          <Link href={!isError ? '/sell' : '/login'}>
            <Button as='a' size='medium'>
              {t('sell')}
            </Button>
          </Link>
          {isError && !isLoading && (
            <Link href='/login'>
              <Button as='a' size='medium'>
                {t('login')}
              </Button>
            </Link>
          )}
          {!isError && user && !isLoading && (
            <Link href='/'>
              <Button as='a' size='medium'>
                {user.data.firstname}
              </Button>
            </Link>
          )}
        </RightNav>
      </StyledContainer>
    </StyledNav>
  )
}

const StyledA = styled.a`
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.xxl};
  cursor: pointer;
`

const StyledNav = styled.nav<{}>`
  height: 50px;
  background-color: ${props => props.theme.colors.background.nav};

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 10px;
`

const StyledContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  flex: 1 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const LeftNav = styled.div`
  display: flex;
  flex: 1 1 auto;
  & > * {
    margin: 0 ${props => props.theme.spacing.micro};
  }
`
const RightNav = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: flex-end;
  & > * {
    margin: 0 ${props => props.theme.spacing.micro};
  }
`

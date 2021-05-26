import Link from 'next/link'
import styled from 'styled-components'
import useTranslation from 'next-translate/useTranslation'

import { useUser } from '../lib/api/client/clientRequests'
import Button, { ButtonSize } from './Button'

export default function Navbar() {
  const { t } = useTranslation('common')
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
          <Button size={ButtonSize.Auto} href='/sell' text={t('sell')}></Button>
          {isError && !isLoading && <Button size={ButtonSize.Auto} href='/login' text={t('login')}></Button>}
          {user && !isLoading && <Button size={ButtonSize.Auto} href='/' text={user.data.firstname}></Button>}
        </RightNav>
      </StyledContainer>
    </StyledNav>
  )
}

const StyledA = styled.a`
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.jumbo};
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

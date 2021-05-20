import Link from 'next/link'
import { fetchUser } from '../lib/api/client/clientRequests'
import { useState, useEffect } from 'react'
import Button, { ButtonSize } from './Button'
import styled from 'styled-components'

export default function Navbar() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchUser()
      .then(res => setUser(res))
      .catch(error => console.error(error))
  }, [])

  return (
    <StyledNav>
      <StyledContainer>
        <LeftNav>
          <Link href={'/'}>
            <StyledA>SHOP</StyledA>
          </Link>
        </LeftNav>
        <RightNav>
          <Button size={ButtonSize.Auto} href='/sell' text='Sell'></Button>
          {!user && <Button size={ButtonSize.Auto} href='/login' text='Login'></Button>}
          {user && <Button size={ButtonSize.Auto} href='/' text={user.data.firstname}></Button>}
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

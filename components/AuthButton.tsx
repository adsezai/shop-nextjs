import Link from 'next/link'
import styled from 'styled-components'
import { Space, SpaceSize } from '../styles/utils'
import GoogleIcon from '../public/icons/google.svg'
import FacebookIcon from '../public/icons/facebook.svg'

type AuthButtonProps = {
  href: string
}

export const AuthButton = ({ href }: AuthButtonProps) => {
  return (
    <Link href={href}>
      <StyledAnchor>
        <StyledAuthButton>Anmelden</StyledAuthButton>
      </StyledAnchor>
    </Link>
  )
}

export const GoogleAuthButton = ({ href }: AuthButtonProps) => {
  return (
    <Link href={href}>
      <StyledAnchor>
        <StyledGoogleAuthButton>
          <StyledIcon size='20'>
            <GoogleIcon />
          </StyledIcon>
          <Space x={SpaceSize.xxs} />
          Weiter mit Google
        </StyledGoogleAuthButton>
      </StyledAnchor>
    </Link>
  )
}

export const FacebookAuthButton = ({ href }: AuthButtonProps) => {
  return (
    <Link href={href}>
      <StyledAnchor>
        <StyledFacebookAuthButton>
          <StyledIcon size='24'>
            <FacebookIcon />
          </StyledIcon>
          <Space x={SpaceSize.xxs} />
          Weiter mit Facebook
        </StyledFacebookAuthButton>
      </StyledAnchor>
    </Link>
  )
}

const StyledIcon = styled.div<{ size: string }>`
  display: flex;
  box-sizing: border-box;
  -webkit-box-pack: end;
  justify-content: flex-end;
  flex-wrap: wrap;
  padding-left: 4px;
  padding-right: 4px;
  svg {
    display: inline-block;
    line-height: 1;
    color: inherit;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    font-size: ${props => props.size}px;
  }
`

const StyledAnchor = styled.a`
  text-decoration: none;
`

const StyledContainer = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;

  text-transform: none,
  white-space: nowrap;
  font-size: ${props => props.theme.fontSizes.normal};
  font-weight: ${props => props.theme.fontWeights.normal};
  text-decoration: none;
  
  user-select: none;
  cursor: pointer;
  min-height: 28px;
  width: 100%;
  margin: 0px;
  padding: 9px 24px;
  
  appearance: none;
  overflow: visible;
  border-radius: 2em;
  
  border-image: initial;
  font-family: inherit;
  `

const StyledAuthButton = styled(StyledContainer)`
  border: 1px solid #e1ecf4;
  background: none #48bb78;
  font-size: ${props => props.theme.fontSizes.normal};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: white;
`

const StyledGoogleAuthButton = styled(StyledContainer)`
  border: 1px solid rgb(146, 161, 169);
  background: none rgb(255, 255, 255);
  color: rgb(15, 29, 14);
`

const StyledFacebookAuthButton = styled(StyledContainer)`
  border: none;
  background: none #166fe5;
  color: rgb(255, 255, 255);
`

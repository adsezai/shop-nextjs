import Head from 'next/head'
import styled from 'styled-components'
import Navbar from './Navbar'

export default function Layout({ children, title }: { children: React.ReactNode; home?: boolean; title?: string }) {
  return (
    <Application>
      <Head>
        <title>{title || ''}</title>
      </Head>
      <Navbar></Navbar>
      <StyledContainer>{children}</StyledContainer>
    </Application>
  )
}

const Application = styled.div`
  height: 100vh;
  background-color: ${props => props.theme.colors.background.default};
`

const StyledContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 30px 16px;
  @media (min-width: ${props => props.theme.breakpoints.mobileL}) {
    max-width: ${props => props.theme.breakpoints.mobileL};
  }
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    max-width: ${props => props.theme.breakpoints.tablet};
  }
  @media (min-width: ${props => props.theme.breakpoints.laptop}) {
    max-width: ${props => props.theme.breakpoints.laptop};
  } ;
`

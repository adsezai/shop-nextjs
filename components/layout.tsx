import Head from 'next/head'
import styled from 'styled-components'
import Navbar from './Navbar'

export default function Layout({ children, title }: { children: React.ReactNode; home?: boolean; title?: string }) {
  return (
    <div>
      <Head>
        <title>{title || ''}</title>
      </Head>
      <Navbar></Navbar>
      <StyledContainer>{children}</StyledContainer>
    </div>
  )
}

const StyledContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 30px 0;
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

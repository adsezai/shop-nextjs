import styled from 'styled-components'

export default function Cardgrid({ children }: { children: Array<JSX.Element> }) {
  return <StyledContainer>{children}</StyledContainer>
}

const StyledContainer = styled.div`
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  padding: 0 16px;
`

import { Item } from '../lib/common/item.interface'
import styled from 'styled-components'

export default function ImageBox() {
  return (
    <StyledContainer>
      <ImageContainer src='https://picsum.photos/400/300' alt='img'></ImageContainer>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  width: 100%;
  background-color: aqua;
`
const ImageContainer = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
`

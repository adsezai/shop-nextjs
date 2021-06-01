import { Item } from '../lib/common/item.interface'
import { Box } from '../styles/utils'
import styled from 'styled-components'

export default function ImageBox() {
  return (
    <Box maxWidth='500px'>
      <ImageContainer src='https://picsum.photos/400/300' alt='img'></ImageContainer>
    </Box>
  )
}

const ImageContainer = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
`

import { Item } from '../lib/common/item.interface'
import { Box, Space, SpaceSize } from '../styles/utils'
import styled from 'styled-components'

export default function ImageBox() {
  return (
    <Box flexDirection='column'>
      <ImageContainer src='https://picsum.photos/400/300' alt='img'></ImageContainer>
      <Space y={SpaceSize.xs} x={SpaceSize.medium}></Space>
      <Box>
        <Thumbnail src='https://picsum.photos/40/40' alt='preview'></Thumbnail>
        <Space y={SpaceSize.xs} x={SpaceSize.xs}></Space>
        <Thumbnail src='https://picsum.photos/40/40' alt='preview'></Thumbnail>
        <Space y={SpaceSize.xs} x={SpaceSize.xs}></Space>
        <Thumbnail src='https://picsum.photos/40/40' alt='preview'></Thumbnail>
      </Box>
    </Box>
  )
}

const Thumbnail = styled.img`
  object-fit: cover;
  user-select: none;
  height: 60px;
  width: 60px;
  border-radius: 5px;
`

const ImageContainer = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  border-radius: 5px;
`

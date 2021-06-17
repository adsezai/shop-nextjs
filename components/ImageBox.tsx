import Image from 'next/image'
import styled from 'styled-components'
import { Box, Space, SpaceSize } from '../styles/utils'

export default function ImageBox({ images }: { images: Array<string> }) {
  return (
    <Box flexDirection='column'>
      <ImageContainer>
        <Image
          layout='fill'
          objectFit='contain'
          src={`https://adsezaistorage.blob.core.windows.net/adsezai/${images[0]}`}
        ></Image>
      </ImageContainer>
      <Space y={SpaceSize.medium} x={SpaceSize.medium}></Space>
      <Box>
        {images.map(
          (i, index) =>
            index > 0 && (
              <Thumbnail key={i} mr='10px'>
                <Image
                  src={`https://adsezaistorage.blob.core.windows.net/adsezai/${i}`}
                  height='70px'
                  width='70px'
                  objectFit='cover'
                ></Image>
              </Thumbnail>
            )
        )}
      </Box>
    </Box>
  )
}

const ImageContainer = styled(Box)`
  position: relative;
  height: 400px;
`
const Thumbnail = styled(Box)`
  & img {
    user-select: none;
    border-radius: 5px;
  }
`

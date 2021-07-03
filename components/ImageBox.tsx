import React, { useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import SwiperCore, { Navigation, Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Box, Space, SpaceSize } from '../styles/utils'
import { createImageURL } from '../lib/api/utils'

SwiperCore.use([Navigation, Thumbs])

export default function ImageBox({ images }: { images: Array<string> }) {
  const [thumbs, setThumbs] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(null)

  return (
    <Box flexDirection='column'>
      <StyledSwiper
        thumbs={{ swiper: thumbs }}
        slidesPerView={1}
        pagination
        navigation
        onSwiper={swiper => setCurrentSlide(swiper.realIndex)}
        onSlideChange={swiper => setCurrentSlide(swiper.realIndex)}
      >
        {images.map(imageUrl => (
          <SwiperSlide key={imageUrl}>
            <ImageWrapper>
              <Image layout='fill' objectFit='contain' src={createImageURL(imageUrl)} alt='item'></Image>
            </ImageWrapper>
          </SwiperSlide>
        ))}
      </StyledSwiper>
      <Space y={SpaceSize.medium} x={SpaceSize.medium}></Space>
      <Box>
        <StyledThumbSwiper id='thumbs' slidesPerView={images.length} spaceBetween={10} onSwiper={setThumbs}>
          {images.map((imageUrl, index) => (
            <SwiperSlide key={`thumb-${imageUrl}`}>
              <ThumbImageContainer active={index === currentSlide}>
                <Image src={createImageURL(imageUrl)} height='75px' width='75px' objectFit='cover' alt=''></Image>
              </ThumbImageContainer>
            </SwiperSlide>
          ))}
        </StyledThumbSwiper>
      </Box>
    </Box>
  )
}

const StyledSwiper = styled(Swiper)`
  max-width: 100%;
  height: 100%;
`
const StyledThumbSwiper = styled(StyledSwiper)`
  margin-left: 0;
`
const ImageWrapper = styled(Box)`
  height: 250px;
  width: 500px;

  @media (min-width: ${props => props.theme.breakpoints.mobileL}) {
    height: 400px;
  }
`

const ThumbImageContainer = styled(Box)<{ active: boolean }>`
  /* TODO handle border size: Image is bigger than SwiperSlide when border exists */
  /* border-width: 3px; */
  border-color: ${props => (props.active ? `${props.theme.colors.primary.medium}` : 'transparent')};
  border-style: solid;
  border-radius: 8px;

  & img {
    user-select: none;
    border-radius: 5px;
  }
`

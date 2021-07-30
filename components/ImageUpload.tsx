import styled from 'styled-components'

import { Box, Space, SpaceSize, Text } from '../styles/utils'
import AddImageIcon from '../public/icons/addimage.svg'
import React, { useEffect, useState } from 'react'

type ImageUploadProp = {
  title: string
  name: string
  register?: any
  error?: any
  setError?: any
  clearErrors?: any
  required?: boolean
}

const ImageUpload = ({ title, name, register, error, setError, clearErrors, required = true }: ImageUploadProp) => {
  const [previewFiles, setPreviewFiles] = useState<Array<string>>()

  useEffect(() => {
    return () => {
      previewFiles &&
        previewFiles.forEach(objectUrl => {
          URL.revokeObjectURL(objectUrl)
        })
    }
  }, [previewFiles])

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files || e.currentTarget.files.length === 0) {
      setPreviewFiles(null)
      return
    }
    clearErrors(name)

    let objectUrls = Array.from(e.currentTarget.files).map(file => {
      const oUrl = URL.createObjectURL(file)
      return oUrl
    })

    setPreviewFiles(objectUrls)
  }

  return (
    <Box flexDirection='column'>
      <Text mt='0'>{title}</Text>
      <Space y={SpaceSize.xs} />
      <RelativeWrapper>
        <Dropzone error={error}>
          <ImageIcon />
          <StyledFileUpload
            {...register(name, { required: required })}
            type='file'
            multiple
            accept='image/png, image/jpeg'
            onChange={handleChange}
          />
        </Dropzone>
      </RelativeWrapper>
      <Space y={SpaceSize.large} />
      <Box width='100%' flexWrap='wrap'>
        {previewFiles &&
          previewFiles.map((objectUrl, idx) => {
            return (
              <Thumbnail key={idx}>
                <ImagePreview src={objectUrl} />
              </Thumbnail>
            )
          })}
      </Box>
      {error && <StyledHint>{error}</StyledHint>}
    </Box>
  )
}
const StyledHint = styled.div`
  color: ${props => props.theme.colors.text.error};
  font-size: ${props => props.theme.fontSizes.xs};
  margin-top: 3px;
`
const Thumbnail = styled.div`
  margin: 8px 15px 8px 0;

  height: 95px;
  width: 115px;
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadiuses.default};
  border-color: ${props => props.theme.colors.borders.lightgray};
`
const ImagePreview = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  display: block;
`

const ImageIcon = styled(AddImageIcon)`
  height: 50px;
  width: 50px;
  fill: ${props => props.theme.colors.borders.lightgray};
`

const RelativeWrapper = styled.div`
  position: relative;
`
const Dropzone = styled(Box)<{ error: any }>`
  height: 100px;
  border-width: 2px;
  border-style: dashed;
  border-color: ${props => (props.error ? props.theme.colors.text.error : props.theme.colors.borders.lightgray)};
  border-radius: ${props => props.theme.borderRadiuses.default};

  justify-content: center;
  align-items: center;

  & :hover {
    border-style: solid;
    border-color: ${props => props.theme.colors.background.nav};
  }
  &:hover ${ImageIcon} {
    fill: ${props => props.theme.colors.background.nav};
  }
`

const StyledFileUpload = styled.input`
  position: absolute;
  top: 0;
  left 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;

`

export default ImageUpload

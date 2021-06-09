import styled from 'styled-components'
import { Box, Space, SpaceSize, Text } from '../styles/utils'

import AddImageIcon from '../public/icons/addimage.svg'
import IconContainer, { IconSize } from './IconContainer'

const ImageUpload = ({}) => {
  return (
    <Box flexDirection='column'>
      <Text>File Upload</Text>
      <Space y={SpaceSize.xs} />
      <RelativeWrapper>
        <Dropzone>
          <ImageIcon />
          <StyledFileUpload type='file' multiple accept='image/png, image/jpeg' required />
        </Dropzone>
      </RelativeWrapper>
    </Box>
  )
}

const ImageIcon = styled(AddImageIcon)`
  height: 50px;
  width: 50px;
  fill: ${props => props.theme.colors.borders.lightgray};
`

const RelativeWrapper = styled.div`
  position: relative;
`
const Dropzone = styled(Box)`
  height: 100px;
  border-width: 2px;
  border-style: dashed;
  border-color: ${props => props.theme.colors.borders.lightgray};
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

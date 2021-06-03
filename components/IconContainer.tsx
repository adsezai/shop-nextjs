import React from 'react'
import styled from 'styled-components'

export enum IconColor {
  default = 'default',
  text = 'text',
  primary = 'primary',
  secondary = 'secondary'
}
export enum IconSize {
  Xsmall = 'xsmall',
  Small = 'small',
  Medium = 'medium',
  Large = 'large'
}

export const ICON_SIZES = {
  xsmall: {
    width: 16,
    height: 16
  },
  small: {
    width: 24,
    height: 24
  },
  medium: {
    width: 32,
    height: 32
  }
}

type IconContainerProps = {
  icon: React.ReactNode
  size?: IconSize
  color?: IconColor
}
const IconContainer = ({ icon, size = IconSize.Medium, color = IconColor.default }: IconContainerProps) => {
  return (
    <StyledIcon size={size} color={color}>
      {icon}
    </StyledIcon>
  )
}

const StyledIcon = styled.div<{ size: IconSize; color: IconColor }>`
  height: ${props => ICON_SIZES[props.size].height}px;
  width: ${props => ICON_SIZES[props.size].width}px;
  > svg {
    height: ${props => ICON_SIZES[props.size].height}px;
    width: ${props => ICON_SIZES[props.size].width}px;
    fill: ${props => props.theme.colors.text.default};
    /* path {
      ${props => props.color === IconColor.default && `fill: ${props.theme.colors.secondary.medium}`}
      ${props => props.color === IconColor.primary && `fill: ${props.theme.colors.primary.medium}`}
      ${props => props.color === IconColor.secondary && `fill: ${props.theme.colors.secondary.medium}`}
    } */
  }
`

export default IconContainer

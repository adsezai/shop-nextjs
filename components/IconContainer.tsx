import React from 'react'
import styled from 'styled-components'
import { space } from 'styled-system'

export enum IconColor {
  default = 'default',
  text = 'text',
  primary = 'primary',
  secondary = 'secondary'
}
export enum IconSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large'
}

export const ICON_SIZES = {
  small: {
    width: 24,
    height: 24
  },
  medium: {
    width: 28,
    height: 28
  },
  large: {
    width: 32,
    height: 32
  }
}

type IconContainerProps = {
  icon: React.ReactNode
  size?: IconSize
  color?: IconColor
  m?: string
}
const IconContainer = ({ icon, size = IconSize.Medium, color = IconColor.default, m }: IconContainerProps) => {
  return (
    <StyledIcon size={size} color={color} m={m}>
      {icon}
    </StyledIcon>
  )
}

const StyledIcon = styled.div<{ size: IconSize; color: IconColor; m: string }>`
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
  ${space}
`

export default IconContainer

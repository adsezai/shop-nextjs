import React from 'react'
import { CENTER_VERTICALLY } from '../styles/utils'
import styled from 'styled-components'
import { layout, LayoutProps, color, ColorProps } from 'styled-system'

export enum ButtonSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large'
}

const BUTTON_SIZES = {
  small: {
    size: {
      width: 'auto',
      height: '30px',
      fontSize: '14px'
    }
  },
  medium: {
    size: {
      width: 'auto',
      height: '32px',
      fontSize: '16px'
    }
  },
  large: {
    size: {
      width: 'auto',
      height: '38px',
      fontSize: '16px'
    }
  }
}

type ButtonProps = {
  size?: string
}

const Button = styled.button<ButtonProps & LayoutProps & ColorProps>`
  cursor: pointer;
  border-radius: ${props => props.theme.borderRadiuses.pill};
  border: none;
  height: ${props => props.size && BUTTON_SIZES[props.size].size.height};
  width: ${props => props.size && BUTTON_SIZES[props.size].size.width};
  padding: 5px 12px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.colors.secondary.medium};
  &:hover {
  }
  ${props =>
    props.disabled &&
    `cursor: default;
    `};
  white-space: nowrap;
  user-select: none;
  font-family: inherit;
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.size && BUTTON_SIZES[props.size].size.fontSize};
  vertical-align: middle;
  ${layout}
  ${color}
`

export default Button

import React from 'react'
import styled from 'styled-components'
import {
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  color,
  ColorProps,
  typography,
  TypographyProps
} from 'styled-system'

export const CENTER_VERTICALLY = `
  display: flex;
  flex-direction: column;
  justify-content: center;`

export const CenterVertically = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const CENTER_HORIZONTALLY = `
  display: inline-block;
  margin: auto;  
`

export const CenterHorizontally = styled.div`
  display: flex;
  align-items: center;
`

export const Space = styled.span<{ x?: string; y?: string }>`
  box-sizing: border-box;
  display: ${props => (props.x ? 'inline-block' : 'block')};
  flex: ${props => (props.x ? '0 1 auto' : '1 1 100%')};
  overflow: hidden;
  margin-left: ${props => props.theme.spacing[props.x]};
  margin-bottom: ${props => props.theme.spacing[props.y]};
`

export const SpaceSize = {
  micro: 'micro',
  xxs: 'xxsmall',
  xs: 'xsmall',
  small: 'small',
  medium: 'medium',
  large: 'large',
  mega: 'mega'
}

export const Box = styled.div<FlexboxProps & LayoutProps & SpaceProps & ColorProps>`
  box-sizing: border-box;
  display: flex;
  min-width: 0;
  ${flexbox}
  ${layout}
  ${space}
  ${color}
`

export const Text = styled.span<TypographyProps & ColorProps>`
  color: ${props => props.theme.colors.text.default};
  margin: 12px 0 0 0;
  ${typography}
  ${color}
`

const CenterHorizontallyVertically = ({ children }) => {
  return (
    <CenterVertically>
      <CenterHorizontally>{children}</CenterHorizontally>
    </CenterVertically>
  )
}

export default { CenterVertically, CenterHorizontally, CenterHorizontallyVertically }

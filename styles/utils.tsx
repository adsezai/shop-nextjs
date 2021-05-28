import React from 'react'
import styled from 'styled-components'

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

export const Box = styled.div<{ width?: string; direction?: string; justify?: string; wrap?: boolean }>`
  box-sizing: border-box;

  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => props.justify || 'flex-start'};
  flex-wrap: ${props => (props.wrap ? 'wrap' : 'nowrap')};
  width: 100%;
`

const CenterHorizontallyVertically = ({ children }) => {
  return (
    <CenterVertically>
      <CenterHorizontally>{children}</CenterHorizontally>
    </CenterVertically>
  )
}

export default { CenterVertically, CenterHorizontally, CenterHorizontallyVertically }

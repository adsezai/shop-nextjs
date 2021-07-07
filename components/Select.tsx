import { forwardRef } from 'react'
import styled from 'styled-components'
import { SpaceSize, Space } from '../styles/utils'

type SelectProps = {
  label?: string
  children: React.ReactElement | Array<React.ReactElement>
  onChange(e: React.ChangeEvent<HTMLSelectElement>): void
  value?: string
  name?: string
  error?: any
}

const Select = forwardRef(({ name, label, children, onChange, value, error }: SelectProps, ref: any) => {
  return (
    <StyledLabel>
      {label}&nbsp;
      {label && <Space y={SpaceSize.micro} />}
      <StyledSelect ref={ref} name={name} value={value} onChange={onChange} error={error}>
        {children}
      </StyledSelect>
      {error && <StyledHint>{error}</StyledHint>}
    </StyledLabel>
  )
})

Select.displayName = 'Select'

const StyledLabel = styled.label`
  color: ${props => props.theme.colors.text.default};
  font-size: ${props => props.theme.fontSizes.m};
`
const StyledHint = styled.div`
  color: ${props => props.theme.colors.text.error};
  font-size: ${props => props.theme.fontSizes.xs};
  margin-top: 3px;
`
const StyledSelect = styled.select<SelectProps>`
  width: 100%;
  min-width: 0px;
  outline: transparent solid 2px;
  outline-offset: 2px;
  position: relative;
  transition: all 0.2s ease 0s;
  font-family: inherit;
  font-weight: 400;
  font-size: ${props => props.theme.fontSizes.m};
  padding-inline-start: ${props => props.theme.spacing.small};
  padding-inline-end: ${props => props.theme.spacing.small};
  height: 40px;
  border-radius: ${props => props.theme.borderRadiuses.default};
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  border-color: ${props => (props.error ? props.theme.colors.text.error : props.theme.colors.borders.lightgray)};
  background: inherit;
`
export default Select

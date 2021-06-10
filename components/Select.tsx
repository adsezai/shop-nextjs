import styled from 'styled-components'
import { SpaceSize, Space } from '../styles/utils'

type SelectProps = {
  label?: string
  children: React.ReactElement | Array<React.ReactElement>
  onChange(e: React.ChangeEvent<HTMLSelectElement>): void
  value?: string
}

const Select = ({ label, children, onChange, value }: SelectProps) => {
  return (
    <StyledLabel>
      {label}
      {label && <Space y={SpaceSize.micro} />}
      <StyledSelect value={value} onChange={onChange}>
        {children}
      </StyledSelect>
    </StyledLabel>
  )
}

const StyledLabel = styled.label`
  color: ${props => props.theme.colors.text.default};
  font-size: ${props => props.theme.fontSizes.m};
`

const StyledSelect = styled.select`
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
  border-color: ${props => props.theme.colors.borders.lightgray};
  background: inherit;
`
export default Select

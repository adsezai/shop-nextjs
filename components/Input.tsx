import styled from 'styled-components'
import { SpaceSize, Space } from '../styles/utils'
import { size, SizeProps } from 'styled-system'

type InputProps = {
  type?: string
  placeholder?: string
  value?: string
  label?: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
  as?: any
  width?: string
  required?: boolean
  name?: string
}

const Input = ({ name, label, type = 'text', placeholder, value, onChange, as, width, required }: InputProps) => {
  return (
    <StyledLabel>
      {label}
      {label && <Space y={SpaceSize.micro} />}
      <StyledInput
        name={name}
        width={width}
        as={as}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      ></StyledInput>
    </StyledLabel>
  )
}

const StyledLabel = styled.label`
  color: ${props => props.theme.colors.text.default};
  font-size: ${props => props.theme.fontSizes.m};
`

const StyledInput = styled.input<InputProps>`
  width: ${props => props.width || '100%'};
  min-width: 0px;
  outline: transparent solid 2px;
  outline-offset: 2px;
  position: relative;
  appearance: none;
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
export default Input

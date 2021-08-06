import { forwardRef } from 'react'
import styled from 'styled-components'
import { SpaceSize, Space } from '../styles/utils'
import { size, SizeProps } from 'styled-system'

type InputProps = {
  type?: string
  placeholder?: string
  value?: string | number
  label?: string
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void
  as?: any
  width?: string
  required?: boolean
  name?: string
  error?: any
  step?: any
  readOnly?: boolean
}

const Input = forwardRef(
  (
    {
      name,
      label,
      type = 'text',
      placeholder,
      value,
      onChange,
      as,
      width,
      required,
      step,
      error,
      readOnly
    }: InputProps,
    ref: any
  ) => {
    return (
      <StyledLabel>
        {label}
        {label && <Space y={SpaceSize.micro} />}
        <StyledInput
          error={error}
          ref={ref}
          name={name}
          width={width}
          as={as}
          type={type}
          value={value}
          step={step}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          readOnly={readOnly}
        ></StyledInput>
        {error && <StyledHint>{error}</StyledHint>}
      </StyledLabel>
    )
  }
)

Input.displayName = 'Input'

const StyledLabel = styled.label`
  color: ${props => props.theme.colors.text.default};
  font-size: ${props => props.theme.fontSizes.m};
`
const StyledHint = styled.div`
  color: ${props => props.theme.colors.text.error};
  font-size: ${props => props.theme.fontSizes.xs};
  margin-top: 3px;
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
  border-color: ${props => (props.error ? props.theme.colors.text.error : props.theme.colors.borders.lightgray)};
  background: inherit;

  &:read-only {
    background-color: ${props => props.theme.colors.background.disabled};
  }
`
export default Input

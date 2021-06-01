import styled from 'styled-components'

type InputProps = {
  type?: string
  placeholder?: string
  value?: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}

const Input = ({ type = 'text', placeholder, value, onChange }: InputProps) => {
  return <StyledInput type={type} value={value} placeholder={placeholder} onChange={onChange}></StyledInput>
}

const StyledInput = styled.input<InputProps>`
  width: 100%;
  min-width: 0px;
  outline: transparent solid 2px;
  outline-offset: 2px;
  position: relative;
  appearance: none;
  transition: all 0.2s ease 0s;
  font-family: inherit;
  font-weight: 400;
  font-size: ${props => props.theme.fontSizes.s};
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

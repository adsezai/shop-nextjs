import 'styled-components'

import 'styled-components'

type Fonts = {
  primary: string
  secondary: string
  tertiary: string
}

type ColorBase = {
  faded: string
  faint: string
  medium: string
  deep: string
}

type ColorText = {
  default: string
  link: string
  warning: string
  error: string
  success: string
}

type ColorBackground = {
  fadedGreyScale: string
  default: string
  nav: string
  error: string
}

type ColorBorders = {
  hairline: string
  lightgray: string
}
type Colors = {
  primary: ColorBase
  secondary: ColorBase
  tertiary: ColorBase
  text: ColorText
  background: ColorBackground
  borders: ColorBorders
}

type Spacing = {
  micro: string
  xxsmall: string
  xsmall: string
  small: string
  medium: string
  large: string
  mega: string
}

type FontSizes = {
  xs: string
  s: string
  m: string
  l: string
  xl: string
  xxl: string
}

type LineHeights = {
  small: string
  normal: string
  large: string
  xlarge: string
  jumbo: string
}

type FontWeights = {
  light: number
  normal: number
  semibold: number
  bold: number
}

type BorderRadiuses = {
  sharp: string
  pill: string
  default: string
  circle: string
}
type Shadows = {
  light: string
  regular: string
  heavy: string
}

type Opacity = {
  30: string
  50: string
  75: string
  85: string
}

type ZIndexes = {
  min: string
  default: string
  sticky: string
  header: string
  toast: string
  dropdown: string
  spinner: string
  modal: string
  max: string
}

type Breakpoints = {
  mobileS: string
  mobileM: string
  mobileL: string
  tablet: string
  laptop: string
}

type Transitions = {
  fast: string
  regular: string
  slow: string
}

export interface Theme {
  name: string
  fonts: Fonts
  colors: Colors
  spacing: Spacing
  fontSizes: FontSizes
  lineHeights: LineHeights
  fontWeights: FontWeights
  borderRadiuses: BorderRadiuses
  shadows: Shadows
  opacity: Opacity
  zIndexes: ZIndexes
  breakpoints: Breakpoints
  transitions: Transitions
}

// Extends the styled components interface with the theme
declare module 'styled-components' {
  // eslint-disable-next-line
  export interface DefaultTheme extends Theme {}
}

// Extends the styled components interface with the theme (for code completion)
declare module 'styled-components' {
  // eslint-disable-next-line
  export interface DefaultTheme extends Theme {}
}

import { Theme } from './styled'

export const theme: Theme = {
  name: 'Default',
  fonts: {
    primary: 'Roboto, sans-serif',
    secondary: 'Source Sans Pro, sans-serif',
    tertiary: 'Times New Roman, sans-serif'
  },
  colors: {
    primary: {
      faded: '#fff',
      faint: '#fff',
      medium: '#7befb2',
      deep: '#fff'
    },
    secondary: {
      faded: '#fff',
      faint: '#fff',
      medium: '#e1ecf4',
      deep: '#fff'
    },
    tertiary: {
      faded: '#fff',
      faint: '#fff',
      medium: '#fff',
      deep: '#fff'
    },
    text: {
      default: '#24292e',
      link: '#fff',
      warning: '#fff',
      error: '#dc3545',
      success: '#28a745'
    },
    background: {
      fadedGreyScale: 'rgba(0, 0, 0, 0.06)',
      default: '#fff', //rgb(247, 248, 247)
      nav: '#7befb2',
      error: '#f8d7da'
    },
    borders: {
      hairline: 'rgb(235, 238, 240)',
      lightgray: '#CBD5E0'
    }
  },

  spacing: {
    // You can use multiples of spaces and/or combine to achieve the desired spacing. E.g "2x @mega + 1x @small"
    micro: '0.2rem',
    xxsmall: '0.4rem',
    xsmall: '0.6rem',
    small: '0.8rem',
    medium: '1rem',
    large: '1.2rem',
    mega: '2rem'
  },

  fontSizes: {
    xs: '12px',
    s: '14px',
    m: '16px',
    l: '20px',
    xl: '24px',
    xxl: '32px'
  },

  lineHeights: {
    small: '0.8rem',
    normal: '1rem',
    large: '1.2rem',
    xlarge: '1.4rem',
    jumbo: '1.6rem'
  },

  fontWeights: {
    light: 300,
    normal: 400,
    semibold: 500,
    bold: 600
  },

  borderRadiuses: {
    sharp: '0',
    pill: '20rem',
    default: '0.25rem',
    circle: '50%'
  },

  shadows: {
    light: '',
    regular: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    heavy: ''
  },

  opacity: {
    30: '30%',
    50: '50%',
    75: '75%',
    85: '85%'
  },

  zIndexes: {
    min: '-999',
    default: '1',
    sticky: '300',
    header: '400',
    toast: '500',
    dropdown: '600',
    spinner: '700',
    modal: '800',
    max: '999'
  },

  breakpoints: {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '540px',
    tablet: '768px',
    laptop: '1024px'
  },

  transitions: {
    fast: '0.3s',
    regular: '0.6s',
    slow: '0.9s'
  }
}

export const darkTheme = {
  colors: {
    background: {
      default: '#fff',
      nav: '#7befb2'
    }
  }
}

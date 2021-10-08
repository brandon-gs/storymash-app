import {Theme} from 'react-native-elements';
import {fontVariants} from './fonts';

// Extend theme with typescript
interface ExtraColors {
  primaryLight: string;
  pink: {
    light: string;
    main: string;
    dark: string;
  };
  disabledIcon: string;
}

declare module 'react-native-elements' {
  interface Colors extends ExtraColors {}
}

// Custom colors
export const themeColors = {
  primary: '#30336b',
  primaryLight: '#595b88',
  pink: {
    light: '#f586e6',
    main: '#f368e0',
    dark: '#aa489c',
  },
  secondary: '#0984e3',
  disabledIcon: '#2d3436',
  border: '#dae8e8',
};

// Create custom theme
const theme: Theme = {
  Text: {
    style: {
      fontFamily: fontVariants.regular,
    },
    h1Style: {
      fontFamily: fontVariants.black,
    },
    h2Style: {
      fontFamily: fontVariants.extraBold,
    },
    h3Style: {
      fontFamily: fontVariants.bold,
    },
    h4Style: {
      fontFamily: fontVariants.semiBold,
    },
  },
  Button: {
    titleStyle: {
      fontFamily: fontVariants.bold,
    },
  },
  Input: {
    inputStyle: {
      fontFamily: fontVariants.regular,
    },
  },
  colors: {
    ...themeColors,
  },
};

export default theme;

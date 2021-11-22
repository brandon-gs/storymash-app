import {ExtraColors} from 'interfaces/theme';
import {Theme} from 'react-native-elements';
import {fontVariants} from './fonts';
import {PRIMARY_COLOR, themeColors} from './themeColors';

declare module 'react-native-elements' {
  interface Colors extends ExtraColors {}
}

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
    primary: PRIMARY_COLOR,
    secondary: '#0984e3',
  },
};

export default theme;

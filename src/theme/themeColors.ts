import {ExtraColors} from 'interfaces/theme';

export const PRIMARY_COLOR = '#1977F3';

/**
 * You can calculate contrastText, dark and light color in this page:
 * https://material.io/resources/color/#!/?view.left=0&view.right=0
 */

// Custom colors
export const themeColors: ExtraColors = {
  main: {
    light: '#6ca5ff',
    main: PRIMARY_COLOR,
    dark: '#004cbf',
    contrastText: '#ffffff',
  },
  pink: {
    light: '#f586e6',
    main: '#f368e0',
    dark: '#aa489c',
    contrastText: '#000000',
  },
  red: {
    dark: '#952122',
    main: '#d63031',
    light: '#de595a',
    contrastText: '#ffffff',
  },
  gray: {
    light: '#565e60',
    main: '#020d10',
    dark: '#2d3436',
    contrastText: '#ffffff',
  },
  border: '#dae8e8',
};

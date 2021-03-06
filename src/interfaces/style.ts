import {ExtraColors} from 'theme/theme';

// Text align
export type TextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify';

// JustifyContent
export type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

// Align Content
export type AlignContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'space-between'
  | 'space-around';

export type AlignType =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'baseline';

export type AlignItems =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'baseline';

// Alignments
export interface Alignments {
  justifyContent: JustifyContent;
  alignContent: AlignContent;
  alignItems: AlignItems;
  alignSelf: AlignItems;
}

// Margins
export type MarginsType =
  | 'm'
  | 'mt'
  | 'mb'
  | 'ml'
  | 'mr'
  | 'mx'
  | 'my'
  | 'margin'
  | 'marginTop'
  | 'marginBottom'
  | 'marginLeft'
  | 'marginRight'
  | 'marginX'
  | 'marginY';

export interface Margins {
  m: number;
  mt: number;
  mb: number;
  ml: number;
  mr: number;
  mx: number;
  my: number;
  margin: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  marginX: number;
  marginY: number;
}

// Paddings
export interface Paddings {
  p: number;
  pt: number;
  pb: number;
  pl: number;
  pr: number;
  px: number;
  py: number;
  padding: number;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  paddingX: number;
  paddingY: number;
}

export type PaddingsType =
  | 'p'
  | 'pt'
  | 'pb'
  | 'pl'
  | 'pr'
  | 'px'
  | 'py'
  | 'padding'
  | 'paddingTop'
  | 'paddingBottom'
  | 'paddingLeft'
  | 'paddingRight'
  | 'paddingX'
  | 'paddingY';

// Flex direction
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';

// Text font variant
export type FontVariant =
  | 'extraLight'
  | 'extraLightItalic'
  | 'light'
  | 'lightItalic'
  | 'regular'
  | 'regularItalic'
  | 'semiBold'
  | 'semiBoldItalic'
  | 'bold'
  | 'boldItalic'
  | 'extraBold'
  | 'extraBoldItalic'
  | 'black'
  | 'blackItalic';

// Colors
export interface Colors extends ExtraColors {
  readonly primary: string;
  readonly secondary: string;
  readonly white: string;
  readonly black: string;
  readonly grey0: string;
  readonly grey1: string;
  readonly grey2: string;
  readonly grey3: string;
  readonly grey4: string;
  readonly grey5: string;
  readonly greyOutline: string;
  readonly searchBg: string;
  readonly success: string;
  readonly warning: string;
  readonly error: string;
  readonly disabled: string;
  readonly divider: string;
}

export interface BackgroundColorProps {
  bg?: string;
  backgroundColor?: string;
  bgTheme?: keyof Colors;
  backgroundColorTheme?: keyof Colors;
}

export interface FontColorProps {
  color?: string;
  colorTheme: keyof Colors;
}

// Font sizes
export interface FontSize {
  fontSize: number;
  fsize: number;
}

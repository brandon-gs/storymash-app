export interface ColorFull {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
}

// Extend theme with typescript
export interface ExtraColors {
  main: ColorFull;
  pink: ColorFull;
  red: ColorFull;
  gray: ColorFull;
  border: string;
}

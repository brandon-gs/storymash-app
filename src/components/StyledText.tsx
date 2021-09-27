import React from 'react';
import {StyleProp, TextProps, ViewStyle} from 'react-native';
import {
  makeStyles,
  Text,
  TextProps as TextPropsNativeElements,
  useTheme,
} from 'react-native-elements';
import {fontVariants} from 'theme/fonts';
import makeStyle from 'theme/makeStyle';

const StyledText = ({
  children = 'Put text as children',
  style,
  ...props
}: StyledTextProps) => {
  const {theme} = useTheme();
  const styles = useStyles(props);
  const defaultStyles = makeStyle<StyleProp<ViewStyle>>(props, theme);

  return (
    <Text style={[styles.default, defaultStyles, style]} {...props}>
      {children}
    </Text>
  );
};

const useStyles = makeStyles(
  (theme, {fontVariant = 'regular', align = 'left'}: StyledTextProps) => ({
    default: {
      fontFamily: fontVariants[fontVariant],
      textAlign: align,
      fontSize: 24,
    },
  }),
);

export interface StyledTextProps
  extends TextProps,
    TextPropsNativeElements,
    Partial<FontColorProps>,
    Partial<FontSize> {
  children?: string | React.ReactNode;
  fontVariant?: FontVariant;
  align?: TextAlign;
}

export default StyledText;

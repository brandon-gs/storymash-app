import {
  AlignContent,
  AlignItems,
  Alignments,
  BackgroundColorProps,
  FlexDirection,
  JustifyContent,
  Margins,
  Paddings,
} from 'interfaces/style';
import React from 'react';
import {StyleProp, View, ViewProps, ViewStyle} from 'react-native';
import {makeStyles, useTheme} from 'react-native-elements';
import makeStyle from 'theme/makeStyle';

const Box = ({children, style, ...props}: BoxProps) => {
  const {theme} = useTheme();
  const defaultStyles = makeStyle<StyleProp<ViewStyle>>(props, theme);
  const styles = useStyles(props);

  return (
    <View style={[styles.default, defaultStyles, style]} {...props}>
      {children}
    </View>
  );
};

const useStyles = makeStyles(
  (theme, {flex = false, height = 'auto', width = 'auto'}: BoxProps) => ({
    default: {
      display: 'flex',
      flex: flex ? 1 : 0,
      height,
      width,
    },
  }),
);

type MergeProps = ViewProps &
  Partial<Margins> &
  Partial<Paddings> &
  Partial<Alignments> &
  Partial<BackgroundColorProps>;

export interface BoxProps extends MergeProps {
  children?: React.ReactNode;
  justifyContent?: JustifyContent;
  alignContent?: AlignContent;
  alignItems?: AlignItems;
  direction?: FlexDirection;
  flex?: boolean;
  height?: number | string;
  width?: number | string;
}

export default Box;

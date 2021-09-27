import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ImageBackgroundProps,
  StyleSheet,
  View,
} from 'react-native';

const {width, height} = Dimensions.get('screen');

export default function BackgroundFull({
  overlay = 0,
  source,
  style,
  ...props
}: BackgroundFullProps) {
  return (
    <>
      <ImageBackground
        source={source}
        style={[styles.default, style]}
        {...props}
      />
      <View
        style={[
          styles.default,
          {
            backgroundColor: `rgba(0,0,0,${overlay})`,
          },
        ]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  default: {
    resizeMode: 'cover',
    flexDirection: 'column',
    position: 'absolute',
    width,
    height,
    flex: 1,
    top: 0,
    zIndex: -100,
  },
});

type Opacity = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;

export interface BackgroundFullProps extends ImageBackgroundProps {
  overlay?: Opacity;
  children?: React.ReactNode;
}

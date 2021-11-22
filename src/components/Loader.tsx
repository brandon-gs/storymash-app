import React from 'react';
import {useTheme} from 'react-native-elements';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

interface LoaderStyle {
  style?: StyleProp<ViewStyle>;
  bg?: string;
}

export default function Loader({
  bg,
  ...props
}: ActivityIndicatorProps & LoaderStyle) {
  const {theme} = useTheme();

  return (
    <View style={[styles.loaderContainer, {backgroundColor: bg}]}>
      <ActivityIndicator
        size={72}
        color={theme.colors?.main?.main}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
  },
});

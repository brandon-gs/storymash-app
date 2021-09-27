import React from 'react';
import {useTheme} from 'react-native-elements';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export default function Loader() {
  const {theme} = useTheme();

  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size={72} color={theme.colors?.primary} />
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

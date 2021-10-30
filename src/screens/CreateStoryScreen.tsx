import {FormStory} from 'containers';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

function CreateStoryScreen() {
  return (
    <ScrollView style={styles.container}>
      <KeyboardAwareScrollView>
        <FormStory />
      </KeyboardAwareScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default CreateStoryScreen;

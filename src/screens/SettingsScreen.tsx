import React, {useCallback} from 'react';
import {SettingsItem} from 'components';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {useThunkDispatch} from 'hooks';
import actions from 'store/actions';

const SettingsScreen = () => {
  const dispatch = useThunkDispatch();

  const logOut = useCallback(() => {
    dispatch(actions.auth.deauthenticate());
  }, [dispatch]);

  return (
    <ScrollView style={styles.scrollView}>
      <SettingsItem
        title="Preguntas frecuentes"
        iconName="help-circle-outline"
        onPress={() => console.log('faq')}
      />
      <SettingsItem
        title="Cerrar sesión"
        iconName="log-out-outline"
        onPress={logOut}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default SettingsScreen;

import {useNavigation} from '@react-navigation/core';
import {Box} from 'components';
import {
  AuthStackRoutes,
  SettingsScreenProp,
} from 'navigation/AuthStackNavigation';
import React from 'react';
import {useTheme} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

const ICON_SIZE = 32;

export default function FollowButton() {
  const navigation = useNavigation<SettingsScreenProp>();
  const user = useSelector(state => state.authentication.user);
  const profile = useSelector(state => state.profile.user);
  const {theme} = useTheme();

  const isOwnProfile = user!._id === profile!._id;

  const goToSettingsScreen = () => {
    navigation.navigate(AuthStackRoutes.Settings);
  };

  if (!isOwnProfile) {
    return <Box bg="white" width={ICON_SIZE} height={ICON_SIZE} />;
  }

  return (
    <TouchableOpacity onPress={goToSettingsScreen}>
      <Icon
        name="settings-outline"
        color={theme.colors!.grey3}
        size={ICON_SIZE}
      />
    </TouchableOpacity>
  );
}

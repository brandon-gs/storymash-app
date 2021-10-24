import {Box} from 'components';
import React from 'react';
import {useTheme} from 'react-native-elements';
import {
  ActivityIndicator,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ICON_SIZE = 32;

interface ButtonFollowProps {
  isOwnProfile: boolean;
  isFollower: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  handlePress: () => Promise<void>;
}

export default function ButtonFollow({
  isOwnProfile,
  isFollower,
  isLoading = false,
  buttonStyle = {},
  handlePress,
}: ButtonFollowProps) {
  const {theme} = useTheme();

  if (isLoading) {
    return (
      <Box style={buttonStyle} height={ICON_SIZE}>
        <ActivityIndicator size={ICON_SIZE} color={theme.colors?.primary} />
      </Box>
    );
  }

  if (isOwnProfile) {
    return <Box bg="white" width={ICON_SIZE} height={ICON_SIZE} />;
  }

  return (
    <TouchableOpacity style={buttonStyle} onPress={handlePress}>
      <Icon
        name={isFollower ? 'person-remove' : 'person-add'}
        color={isFollower ? theme.colors!.red!.main : theme.colors!.primary}
        size={ICON_SIZE}
      />
    </TouchableOpacity>
  );
}

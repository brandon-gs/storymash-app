import React, {useEffect, useState} from 'react';
import {ImageSourcePropType} from 'react-native';
import {Box, StyledText} from 'components';
import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import Icon from 'react-native-vector-icons/Ionicons';
import {Avatar} from 'react-native-elements';
import {useSelector} from 'react-redux';
import defaultImage from 'assets/images/profile/default_profile.png';

interface AuthHeaderProps extends BottomTabHeaderProps {}

const ICON_SIZE = 32;

const AuthHeader = ({navigation}: AuthHeaderProps) => {
  const {
    authentication: {user},
  } = useSelector(state => state);

  const [canGoBack, setCanGoBack] = useState<boolean>(navigation.canGoBack());

  const avatarSource = getAvatarSource(user?.image);

  useEffect(() => {
    setCanGoBack(navigation.canGoBack());
  }, [navigation]);

  return (
    <Box
      bg="primary"
      direction="row"
      px={1}
      justifyContent="space-between"
      alignItems="center">
      {canGoBack && (
        <Icon
          name="chevron-back-outline"
          size={ICON_SIZE}
          color={'white'}
          onPress={() => navigation.goBack()}
        />
      )}
      {!canGoBack && (
        <StyledText color="white" fsize={3.5} fontVariant="black">
          Storymash
        </StyledText>
      )}
      <Box direction="row">
        <Box mx={0.5} px={1} py={1}>
          <Icon name="notifications-outline" size={ICON_SIZE} color={'white'} />
        </Box>
        <Box mx={0.5} px={1} py={1}>
          <Icon name="search-outline" size={ICON_SIZE} color={'white'} />
        </Box>
        <Box px={1} py={1}>
          <Avatar source={avatarSource} rounded size={ICON_SIZE} />
        </Box>
      </Box>
    </Box>
  );
};

function getAvatarSource(image: string | undefined): ImageSourcePropType {
  if (image && image.includes('http')) {
    return {uri: image};
  }
  return defaultImage;
}

export default AuthHeader;

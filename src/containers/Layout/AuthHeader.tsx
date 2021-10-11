import React, {useEffect, useState} from 'react';
import {ImageSourcePropType} from 'react-native';
import {Box, StyledText} from 'components';
import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import Icon from 'react-native-vector-icons/Ionicons';
import {Avatar, makeStyles, useTheme} from 'react-native-elements';
import {useSelector} from 'react-redux';
import defaultImage from 'assets/images/profile/default_profile.png';
import {AuthStackRoutes} from 'navigation/AuthStackNavigation';

interface AuthHeaderProps extends BottomTabHeaderProps {}

const ICON_SIZE = 28;

const AuthHeader = ({navigation}: AuthHeaderProps) => {
  const {
    authentication: {user},
  } = useSelector(state => state);
  const {theme} = useTheme();

  const [canGoBack, setCanGoBack] = useState<boolean>(navigation.canGoBack());

  const avatarSource = getAvatarSource(user?.image);

  const styles = useStyles();

  useEffect(() => {
    setCanGoBack(navigation.canGoBack());
  }, [navigation]);

  return (
    <Box
      bg="white"
      direction="row"
      px={1}
      justifyContent="space-between"
      alignItems="center"
      style={styles.container}>
      {canGoBack && (
        <Icon
          name="chevron-back-outline"
          size={ICON_SIZE}
          color={theme.colors!.primary}
          onPress={() => navigation.goBack()}
        />
      )}
      {!canGoBack && (
        <StyledText color="primary" fsize={3.5} fontVariant="black">
          Storymash
        </StyledText>
      )}
      <Box direction="row">
        <Box mx={0.5} px={1} py={1}>
          <Icon
            name="notifications-outline"
            size={ICON_SIZE}
            color={theme.colors?.primary}
          />
        </Box>
        <Box mx={0.5} px={1} py={1}>
          <Icon
            name="search-outline"
            size={ICON_SIZE}
            color={theme.colors?.primary}
          />
        </Box>
        <Box px={1} py={1}>
          <Avatar
            source={avatarSource}
            rounded
            size={ICON_SIZE}
            onPress={() =>
              navigation.navigate(AuthStackRoutes.Profile, {
                profileUsername: user!.username,
              })
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    borderBottomColor: theme.colors?.border,
    borderBottomWidth: 1,
  },
}));

function getAvatarSource(image: string | undefined): ImageSourcePropType {
  if (image && image.includes('http')) {
    return {uri: image};
  }
  return defaultImage;
}

export default AuthHeader;

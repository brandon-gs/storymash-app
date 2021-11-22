import React, {useEffect, useState} from 'react';
import {Box, StyledText} from 'components';
import Icon from 'react-native-vector-icons/Ionicons';
import {makeStyles, useTheme} from 'react-native-elements';
import {NativeStackHeaderProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {useSelector} from 'react-redux';
import {Dimensions} from 'react-native';

interface ProfileHeaderProps extends NativeStackHeaderProps {
  title: string;
}

const ICON_SIZE = 28;

const {width} = Dimensions.get('window');

const ProfileHeader = ({navigation, title}: ProfileHeaderProps) => {
  const user = useSelector(state => state.authentication.user);
  const profile = useSelector(state => state.profile);
  const {theme} = useTheme();

  const [canGoBack, setCanGoBack] = useState<boolean>(navigation.canGoBack());

  const styles = useStyles();

  useEffect(() => {
    setCanGoBack(navigation.canGoBack());
  }, [navigation]);

  if (!profile.user) {
    return null;
  }

  const isOwnProfile = user!._id === profile.user._id;

  const mainColor = theme.colors?.main?.main;

  return (
    <Box
      bg="white"
      direction="row"
      py={1}
      px={1}
      alignItems="center"
      style={styles.container}>
      {canGoBack && (
        <Icon
          name="chevron-back-outline"
          size={ICON_SIZE}
          color={mainColor}
          onPress={() => navigation.goBack()}
        />
      )}
      <Box width={width - 24 - ICON_SIZE * 2} alignItems="center">
        <StyledText color="primary" fsize={2.8} fontVariant="bold">
          {title}
        </StyledText>
      </Box>
      <Icon
        name="create-outline"
        size={isOwnProfile ? ICON_SIZE : 0}
        color={mainColor}
        // onPress={goToEditProfileScreen} TODO: Implement redirect to edit profile screen
      />
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    borderBottomColor: theme.colors?.border,
    borderBottomWidth: 1,
  },
}));

export default ProfileHeader;

import {RouteProp, useFocusEffect, useRoute} from '@react-navigation/native';
import {Loader} from 'components';
import {StoriesProfile} from 'containers';
import {useLoader, useThunkDispatch} from 'hooks';
import {AuthStackParams, AuthStackRoutes} from 'navigation/AuthStackNavigation';
import React, {useCallback} from 'react';
import {StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import actions from 'store/actions';
import {themeColors} from 'theme/themeColors';

const ProfileScreen = () => {
  const dispatch = useThunkDispatch();
  const profile = useSelector(state => state.profile.user);
  const route = useRoute<RouteProp<AuthStackParams, AuthStackRoutes.Profile>>();

  const {profileUsername} = route.params;

  // Prevent get data again if current profile is the last visited
  const wasVisitedBefore = Boolean(
    profile && profile.username === profileUsername,
  );

  const [loading, enableLoading, disableLoading] = useLoader(!wasVisitedBefore);

  // Get user profile info
  useFocusEffect(
    useCallback(() => {
      const getProfileData = async () => {
        enableLoading();
        await dispatch(actions.profile.setProfileStories(profileUsername, 0));
        await dispatch(actions.profile.setProfile(profileUsername));
        disableLoading();
      };
      if (!wasVisitedBefore) {
        getProfileData();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  if (loading && !wasVisitedBefore) {
    return <Loader />;
  }

  if (!profile || profile!.username !== profileUsername) {
    return null;
  }

  return (
    <>
      <StatusBar backgroundColor={themeColors.main.main} />
      <StoriesProfile profile={profile} />
    </>
  );
};

export default ProfileScreen;

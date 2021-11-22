import {useNavigation} from '@react-navigation/core';
import {Box} from 'components';
import {EmptyStories} from 'containers';
import {useLoader, useThunkDispatch} from 'hooks';
import {User} from 'interfaces/user';
import {
  AuthStackRoutes,
  ProfileScreenProp,
} from 'navigation/AuthStackNavigation';
import React, {useCallback, useState} from 'react';
import {ActivityIndicator, FlatList, ListRenderItemInfo} from 'react-native';
import {useTheme} from 'react-native-elements';
import {useSelector} from 'react-redux';
import actions from 'store/actions';
import SearchProfileItem from './SearchProfileItem';

function SearchProfileList() {
  const {theme} = useTheme();
  const dispatch = useThunkDispatch();

  const navigation = useNavigation<ProfileScreenProp>();

  const user = useSelector(state => state.authentication.user);
  const profiles = useSelector(state => state.search.profiles.docs);
  const hasNextPage = useSelector(state => state.search.profiles.hasNextPage);

  const [loading, enableLoading, disableLoading] = useLoader(false);
  const [followLoading, setFollowLoading] = useState<Record<string, boolean>>(
    {},
  );

  const addUserToFollowLoading = (username: string) =>
    setFollowLoading(prevFollowLoading => ({
      ...prevFollowLoading,
      [username]: true,
    }));

  const removeUserFromFollowLoading = (username: string) => {
    setFollowLoading(prevFollowLoading => ({
      ...prevFollowLoading,
      [username]: false,
    }));
  };

  const handleFollowPress = useCallback(
    async (username: string, profileId: string, isFollower: boolean) => {
      if (isFollower) {
        addUserToFollowLoading(username);
        await dispatch(actions.search.unfollowProfile(username, profileId));
        removeUserFromFollowLoading(username);
      } else {
        addUserToFollowLoading(username);
        await dispatch(actions.search.followProfile(username, profileId));
        removeUserFromFollowLoading(username);
      }
    },
    [dispatch],
  );

  const goToProfile = useCallback(
    (username: string) => () => {
      navigation.navigate(AuthStackRoutes.Profile, {
        profileUsername: username,
      });
    },
    [navigation],
  );

  const renderItem = (props: ListRenderItemInfo<User>) => {
    const isFollower = user!.following.includes(props.item._id);
    const isOwnProfile = props.item._id === user!._id;
    const isFollowingLoading = followLoading[props.item.username]
      ? followLoading[props.item.username]
      : false;
    return (
      <SearchProfileItem
        isFollowingLoading={isFollowingLoading}
        handleFollowPress={handleFollowPress}
        isFollower={isFollower}
        goToProfile={goToProfile}
        isOwnProfile={isOwnProfile}
        {...props}
      />
    );
  };

  const renderLoader = () => {
    return loading ? (
      <Box my={8} alignItems="center">
        <ActivityIndicator size="large" color={theme.colors?.main?.main} />
      </Box>
    ) : null;
  };

  const onEndReached = useCallback(async () => {
    if (hasNextPage) {
      enableLoading();
      await dispatch(actions.search.setProfiles());
      disableLoading();
    }
  }, [dispatch, enableLoading, disableLoading, hasNextPage]);

  return (
    <FlatList
      data={profiles}
      renderItem={renderItem}
      ListEmptyComponent={<EmptyStories title="No se encontraron personas" />}
      ListFooterComponent={renderLoader}
      onEndReached={onEndReached}
    />
  );
}

export default SearchProfileList;

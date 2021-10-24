import {Box} from 'components';
import {EmptyStories} from 'containers';
import {useButtonFollow, useLoader, useThunkDispatch} from 'hooks';
import {User} from 'interfaces/user';
import React, {useCallback} from 'react';
import {ActivityIndicator, FlatList, ListRenderItemInfo} from 'react-native';
import {useTheme} from 'react-native-elements';
import {useSelector} from 'react-redux';
import actions from 'store/actions';
import SearchProfileItem from './SearchProfileItem';

function SearchProfileList() {
  const {theme} = useTheme();
  const dispatch = useThunkDispatch();
  const user = useSelector(state => state.authentication.user);
  const profiles = useSelector(state => state.search.profiles);

  const {handlePress} = useButtonFollow();
  const [loading, enableLoading, disableLoading] = useLoader(false);

  const handleFollowPress = useCallback(
    async (username: string, profileId: string, isFollower: boolean) => {
      console.log('callback', profileId);
      await handlePress(username, profileId, isFollower);
      if (isFollower) {
        dispatch(actions.search.unfollowProfile(profileId));
      } else {
        dispatch(actions.search.followProfile(profileId));
      }
    },
    [handlePress, dispatch],
  );

  const goToProfile = (username: string) => () => {
    console.log('Go to profile: ', username);
  };

  const renderItem = (props: ListRenderItemInfo<User>) => {
    console.log(props.item._id);
    console.log(user?.following);
    const isFollower = user!.following.includes(props.item._id);
    const isOwnProfile = props.item._id === user!._id;
    return (
      <SearchProfileItem
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
        <ActivityIndicator size="large" color={theme.colors?.primary} />
      </Box>
    ) : null;
  };

  const onEndReached = useCallback(async () => {
    if (profiles.hasNextPage) {
      enableLoading();
      await dispatch(actions.search.setProfiles());
      disableLoading();
    }
  }, [dispatch, enableLoading, disableLoading, profiles.hasNextPage]);

  return (
    <FlatList
      data={profiles.docs}
      renderItem={renderItem}
      ListEmptyComponent={<EmptyStories title="No se encontraron personas" />}
      ListFooterComponent={renderLoader}
      onEndReached={onEndReached}
    />
  );
}

export default SearchProfileList;

import {Box} from 'components';
import {useThunkDispatch} from 'hooks';
import React, {useCallback} from 'react';
import {useTheme} from 'react-native-elements';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import actions from 'store/actions';

const ICON_SIZE = 32;

export default function FollowButton() {
  const {theme} = useTheme();
  const {isOwnProfile, isFollower, handlePress} = useButtonFollow();

  if (isOwnProfile) {
    return <Box bg="white" width={ICON_SIZE} height={ICON_SIZE} />;
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <Icon
        name={isFollower ? 'person-remove' : 'person-add'}
        color={isFollower ? theme.colors!.red!.main : theme.colors!.primary}
        size={ICON_SIZE}
      />
    </TouchableOpacity>
  );
}

function useButtonFollow() {
  const dispatch = useThunkDispatch();
  const user = useSelector(state => state.authentication.user);
  const profile = useSelector(state => state.profile.user);

  const isOwnProfile = user!._id === profile!._id;
  const isFollower = profile!.followers.includes(user!._id);

  const followUser = useCallback(() => {
    dispatch(actions.profile.followUser());
  }, [dispatch]);

  const unfollowUser = useCallback(() => {
    dispatch(actions.profile.unfollowUser());
  }, [dispatch]);

  const handlePress = useCallback(() => {
    if (!isFollower) {
      followUser();
    } else {
      unfollowUser();
    }
  }, [isFollower, followUser, unfollowUser]);

  return {
    isOwnProfile,
    isFollower,
    handlePress,
  };
}

import {useThunkDispatch} from 'hooks';
import {User} from 'interfaces/user';
import {useCallback} from 'react';
import {useSelector} from 'react-redux';
import actions from 'store/actions';

function useButtonFollow(profile: User | null) {
  const dispatch = useThunkDispatch();
  const user = useSelector(state => state.authentication.user);

  const isOwnProfile = profile && user ? user._id === profile._id : false;
  const isUserFollowing =
    profile && user ? user.following.includes(profile._id) : false;

  const handleFollowUser = useCallback(async () => {
    if (profile) {
      await dispatch(actions.profile.followUser(profile.username));
    }
  }, [dispatch, profile]);

  const handleUnfollowUser = useCallback(async () => {
    if (profile) {
      await dispatch(actions.profile.unfollowUser(profile.username));
    }
  }, [dispatch, profile]);

  const handlePress = useCallback(async () => {
    // follow if current user is not follower
    if (!isUserFollowing) {
      await handleFollowUser();
    } else {
      await handleUnfollowUser();
    }
    await dispatch(actions.plank.getPlankStories(0));
  }, [dispatch, isUserFollowing, handleFollowUser, handleUnfollowUser]);

  return {
    isOwnProfile,
    isUserFollowing,
    isFollower: false,
    handlePress,
  };
}

export default useButtonFollow;

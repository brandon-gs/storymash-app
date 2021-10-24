import {useThunkDispatch} from 'hooks';
import {User} from 'interfaces/user';
import {useCallback} from 'react';
import {useSelector} from 'react-redux';
import actions from 'store/actions';

function useButtonFollow(followUser?: User) {
  const dispatch = useThunkDispatch();
  const user = useSelector(state => state.authentication.user);
  const userProfile = useSelector(state => state.profile.user);
  const profile = followUser ? followUser : userProfile;

  const isOwnProfile = profile && user ? user._id === profile._id : false;
  const isFollower =
    profile && user ? user.following.includes(profile._id) : false;

  const handleFollowUser = useCallback(
    async (username?: string, userId?: string) => {
      const _username = profile ? profile.username : username;
      const profileId = profile ? profile._id : userId;
      if (profileId) {
        await dispatch(actions.profile.followUser(_username));
        dispatch(actions.auth.followUser(profileId));
      }
    },
    [dispatch, profile],
  );

  const handleUnfollowUser = useCallback(
    async (username?: string, userId?: string) => {
      const _username = profile ? profile.username : username;
      const profileId = profile ? profile._id : userId;
      if (profileId) {
        await dispatch(actions.profile.unfollowUser(_username));
        dispatch(actions.auth.unfollowUser(profileId));
      }
    },
    [dispatch, profile],
  );

  const handlePress = useCallback(
    async (username?: string, userId?: string, _isFollower?: boolean) => {
      const follower = _isFollower !== undefined ? _isFollower : isFollower;
      // follow if current user is not follower
      if (!follower) {
        await handleFollowUser(username, userId);
      } else {
        await handleUnfollowUser(username, userId);
      }
      await dispatch(actions.plank.getPlankStories(0));
    },
    [dispatch, isFollower, handleFollowUser, handleUnfollowUser],
  );

  return {
    isOwnProfile,
    isFollower,
    handlePress,
  };
}

export default useButtonFollow;

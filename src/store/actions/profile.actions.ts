import {Dispatch} from 'redux';
import {
  ADD_LIKE_TO_PROFILE_STORY,
  ProfileActionTypes,
  PROFILE_DISABLE_FOLLOW_LOADING,
  PROFILE_ENABLE_FOLLOW_LOADING,
  PROFILE_FOLLOW_USER,
  PROFILE_UNFOLLOW_USER,
  SET_PROFILE,
  SET_PROFILE_STORIES,
} from 'store/types/profile.types';
import * as profileAPI from 'api/profile';
import {RootState} from 'store/types';
import {LikeActions} from 'hooks/useButtonLike';
import {AuthActions} from 'store/types/auth.types';
import {SearchActionTypes} from 'store/types/search.types';

// Actions
export const setProfile = (profileUsername: string) => {
  return async (dispatch: Dispatch<ProfileActionTypes>) => {
    try {
      const {user} = await profileAPI.getProfile(profileUsername);
      dispatch({
        type: SET_PROFILE,
        payload: {
          profile: user,
        },
      });
    } catch (e) {
      // Todo show an error
      console.log(JSON.stringify(e));
      console.log('Error getting info profile');
    }
  };
};

export const setProfileStories = (
  profileUsername: string,
  page = -1,
  limit = -1,
) => {
  return async (
    dispatch: Dispatch<ProfileActionTypes>,
    getState: () => RootState,
  ) => {
    const prevDataStories = getState().profile.stories;
    const currentPage = page >= 0 ? page : prevDataStories.page;
    const currentLimit = limit >= 0 ? limit : prevDataStories.limit;
    try {
      const stories = await profileAPI.getProfileStories(
        profileUsername,
        currentLimit,
        currentPage,
      );
      dispatch({
        type: SET_PROFILE_STORIES,
        payload: stories,
      });
    } catch (e) {
      // Todo show an error
      console.log(JSON.stringify(e));
      console.log('Error getting profile stories');
    }
  };
};

export const likeProfileStory = (
  storyId: string,
  storyPartIndex: number,
  option: LikeActions,
  userId: string,
) => {
  return async (dispatch: Dispatch<ProfileActionTypes>) => {
    dispatch({
      type: ADD_LIKE_TO_PROFILE_STORY,
      payload: {
        storyId,
        storyPartIndex,
        userId,
        option,
      },
    });
  };
};

export const followUser = (username?: string) => {
  return async (
    dispatch: Dispatch<ProfileActionTypes | AuthActions | SearchActionTypes>,
    getState: () => RootState,
  ) => {
    dispatch({
      type: PROFILE_ENABLE_FOLLOW_LOADING,
    });
    try {
      const userId = getState().authentication.user._id;
      const profileUsername = username
        ? username
        : getState().profile.user!.username;

      const {profile} = await profileAPI.putFollowUser(profileUsername);
      dispatch({
        type: PROFILE_FOLLOW_USER,
        payload: profile,
      });
      dispatch({
        type: '@AUTH/USER_ADD_FOLLOWER',
        payload: {
          userToFollowId: profile._id,
        },
      });
      dispatch({
        type: 'SEARCH_FOLLOW_PROFILE',
        payload: {
          profileId: profile._id,
          userId,
        },
      });
    } catch (e) {
      // Todo show an error
      console.log(JSON.stringify(e));
      console.log('Error following user');
    }
    dispatch({
      type: PROFILE_DISABLE_FOLLOW_LOADING,
    });
  };
};

export const unfollowUser = (username = '') => {
  return async (
    dispatch: Dispatch<ProfileActionTypes | AuthActions | SearchActionTypes>,
    getState: () => RootState,
  ) => {
    dispatch({
      type: PROFILE_ENABLE_FOLLOW_LOADING,
    });
    try {
      const userId = getState().authentication.user._id;
      const profileUsername = username
        ? username
        : getState().profile.user!.username;

      const {profile} = await profileAPI.putUnfollowUser(profileUsername);
      dispatch({
        type: PROFILE_UNFOLLOW_USER,
        payload: profile,
      });
      dispatch({
        type: '@AUTH/USER_REMOVE_FOLLOWER',
        payload: {
          userToUnfollowId: profile._id,
        },
      });
      dispatch({
        type: 'SEARCH_UNFOLLOW_PROFILE',
        payload: {
          profileId: profile._id,
          userId,
        },
      });
    } catch (e) {
      // Todo show an error
      console.log(JSON.stringify(e));
      console.log('Error following user');
    }
    dispatch({
      type: PROFILE_DISABLE_FOLLOW_LOADING,
    });
  };
};

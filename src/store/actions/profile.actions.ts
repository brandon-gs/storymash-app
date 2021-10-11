import {Dispatch} from 'redux';
import {
  ADD_LIKE_TO_PROFILE_STORY,
  ProfileActionTypes,
  PROFILE_FOLLOW_USER,
  PROFILE_UNFOLLOW_USER,
  SET_PROFILE,
  SET_PROFILE_STORIES,
} from 'store/types/profile.types';
import * as profileAPI from 'api/profile';
import {RootState} from 'store/types';
import {LikeActions} from 'hooks/useLikeButton';

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

export const followUser = () => {
  return async (
    dispatch: Dispatch<ProfileActionTypes>,
    getState: () => RootState,
  ) => {
    try {
      const profileUsername = getState().profile.user!.username;
      const {profile} = await profileAPI.putFollowUser(profileUsername);
      dispatch({
        type: PROFILE_FOLLOW_USER,
        payload: profile,
      });
    } catch (e) {
      // Todo show an error
      console.log(JSON.stringify(e));
      console.log('Error following user');
    }
  };
};

export const unfollowUser = () => {
  return async (
    dispatch: Dispatch<ProfileActionTypes>,
    getState: () => RootState,
  ) => {
    try {
      const profileUsername = getState().profile.user!.username;
      const {profile} = await profileAPI.putUnfollowUser(profileUsername);
      dispatch({
        type: PROFILE_UNFOLLOW_USER,
        payload: profile,
      });
    } catch (e) {
      // Todo show an error
      console.log(JSON.stringify(e));
      console.log('Error following user');
    }
  };
};

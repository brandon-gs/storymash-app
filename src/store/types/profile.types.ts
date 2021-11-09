import {LikeActions} from 'hooks/useButtonLike';
import {User} from 'interfaces/user';
import {StoriesState} from './stories.types';

export const SET_PROFILE = '@PROFILE/SET_PROFILE';
export const SET_PROFILE_STORIES = '@PROFILE/SET_PROFILE_STORIES';
export const ADD_LIKE_TO_PROFILE_STORY = '@PROFILE/ADD_LIKE_TO_PROFILE_STORY';
export const PROFILE_FOLLOW_USER = '@PROFILE/FOLLOW_USER';
export const PROFILE_UNFOLLOW_USER = '@PROFILE/UNFOLLOW_USER';
export const PROFILE_ENABLE_FOLLOW_LOADING = '@PROFILE/ENABLE_FOLLOW_LOADING';
export const PROFILE_DISABLE_FOLLOW_LOADING = '@PROFILE/DISABLE_FOLLOW_LOADING';

export type ProfileState = {
  user: User | null;
  stories: StoriesState;
  loadingFollow: boolean;
};

interface EnableLoadingFollowing {
  type: typeof PROFILE_ENABLE_FOLLOW_LOADING;
}

interface DisableLoadingFollowing {
  type: typeof PROFILE_DISABLE_FOLLOW_LOADING;
}

interface SetProfile {
  type: typeof SET_PROFILE;
  payload: {
    profile: User;
  };
}

interface SetProfileStories {
  type: typeof SET_PROFILE_STORIES;
  payload: StoriesState;
}

interface AddLikeToProfileStory {
  type: typeof ADD_LIKE_TO_PROFILE_STORY;
  payload: {
    storyId: string;
    storyPartIndex: number;
    userId: string;
    option: LikeActions;
  };
}

interface FollowUser {
  type: typeof PROFILE_FOLLOW_USER;
  payload: User;
}

interface UnfollowUser {
  type: typeof PROFILE_UNFOLLOW_USER;
  payload: User;
}

export type ProfileActionTypes =
  | SetProfile
  | SetProfileStories
  | AddLikeToProfileStory
  | FollowUser
  | UnfollowUser
  | EnableLoadingFollowing
  | DisableLoadingFollowing;

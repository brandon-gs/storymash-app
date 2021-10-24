import {LikeActions} from 'hooks/useButtonLike';
import {User} from 'interfaces/user';
import {StoriesState} from './stories.types';

export const SET_PROFILE = 'SET_PROFILE';
export const SET_PROFILE_STORIES = 'SET_PROFILE_STORIES';
export const ADD_LIKE_TO_PROFILE_STORY = 'ADD_LIKE_TO_PROFILE_STORY';
export const PROFILE_FOLLOW_USER = 'PROFILE_FOLLOW_USER';
export const PROFILE_UNFOLLOW_USER = 'PROFILE_UNFOLLOW_USER';

export type ProfileState = {
  user: User | null;
  stories: StoriesState;
};

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
  | UnfollowUser;

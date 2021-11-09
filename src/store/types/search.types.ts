import {User} from 'interfaces/user';
import {Paginate} from 'interfaces/global';
import {StoriesState} from './stories.types';

export const DISABLE_SEARCH_LOADING = '@SEARCH/DISABLE_SEARCH_LOADING';
export const ENABLE_SEARCH_LOADING = '@SEARCH/ENABLE_SEARCH_LOADING';
export const SET_SEARCH_QUERY = '@SEARCH/SET_SEARCH_QUERY';
export const SET_SEARCH_RESULTS = '@SEARCH/SET_SEARCH_RESULTS';
export const SET_SEARCH_STORIES = '@SEARCH/SET_SEARCH_STORIES';
export const SET_SEARCH_PROFILES = '@SEARCH/SET_SEARCH_PROFILES';
export const SEARCH_FOLLOW_PROFILE = '@SEARCH/FOLLOW_PROFILE';
export const SEARCH_UNFOLLOW_PROFILE = '@SEARCH/UNFOLLOW_PROFILE';

type Profiles = Paginate<User>;

export interface SearchState {
  stories: StoriesState;
  profiles: Profiles;
  query: string;
  loading: boolean;
}

interface SearchFollowUser {
  type: typeof SEARCH_FOLLOW_PROFILE;
  payload: {
    userId: string;
    profileId: string;
  };
}

interface SearchUnfollowUser {
  type: typeof SEARCH_UNFOLLOW_PROFILE;
  payload: {
    userId: string;
    profileId: string;
  };
}

interface EnableSearchLoading {
  type: typeof ENABLE_SEARCH_LOADING;
}

interface DisableSearchLoading {
  type: typeof DISABLE_SEARCH_LOADING;
}

interface SetSearchQuery {
  type: typeof SET_SEARCH_QUERY;
  payload: {query: string};
}

interface SetSearchResults {
  type: typeof SET_SEARCH_RESULTS;
  payload: {stories: StoriesState; profiles: Profiles};
}

interface SetSearchStories {
  type: typeof SET_SEARCH_STORIES;
  payload: {
    stories: StoriesState;
  };
}

interface SetSearchProfiles {
  type: typeof SET_SEARCH_PROFILES;
  payload: {
    profiles: Profiles;
  };
}

export type SearchActionTypes =
  | SetSearchResults
  | SetSearchQuery
  | SetSearchStories
  | SetSearchProfiles
  | EnableSearchLoading
  | DisableSearchLoading
  | SearchFollowUser
  | SearchUnfollowUser;

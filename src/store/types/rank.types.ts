import {StoriesState} from './stories.types';

export const SET_RANK_STORIES = 'SET_RANK_STORIES';

export type RankStoriesState = StoriesState;

interface SetRankStories {
  type: typeof SET_RANK_STORIES;
  payload: {
    data: StoriesState;
  };
}

export type RankStoriesActionTypes = SetRankStories;

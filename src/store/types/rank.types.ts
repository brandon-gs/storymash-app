import {StoriesState} from './stories.types';

export const SET_RANK_STORIES = '@RANK/SET_RANK_STORIES';
export const LIKE_RANK_STORY = '@RANK/LIKE_RANK_STORY';

export type RankStoriesState = StoriesState;

interface SetRankStories {
  type: typeof SET_RANK_STORIES;
  payload: {
    data: StoriesState;
  };
}

interface LikeToRankStoryAction {
  type: typeof LIKE_RANK_STORY;
  payload: {
    storyId: string;
    userId: string;
    storyPartIndex: number;
    option: string;
  };
}

export type RankStoriesActionTypes = SetRankStories | LikeToRankStoryAction;

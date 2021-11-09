import {StoriesState} from './stories.types';

export const SET_PLANK_STORIES = '@PLANK/SET_PLANK_STORIES';
export const LIKE_PLANK_STORY = '@PLANK/LIKE_PLANK_STORY';

export type PlankStoriesState = StoriesState;

interface SetRankStories {
  type: typeof SET_PLANK_STORIES;
  payload: {
    data: StoriesState;
  };
}

interface LikeToRankStoryAction {
  type: typeof LIKE_PLANK_STORY;
  payload: {
    storyId: string;
    userId: string;
    storyPartIndex: number;
    option: string;
  };
}

export type PlankStoriesActionTypes = SetRankStories | LikeToRankStoryAction;

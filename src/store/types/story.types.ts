import {LikeActions} from 'hooks/useLikeButton';
import {Story} from 'interfaces/story';

export const UPDATE_CURRENT_STORY = 'UPDATE_CURRENT_IN_READ_SCREEN_STORY';
export const CLEAR_CURRENT_STORY = 'CLEAR_CURRENT_STORY';
export const ADD_VIEW_TO_STORY = 'ADD_VIEW_TO_STORY';
export const UPDATE_CURRENT_PART_INDEX = 'UPDATE_CURRENT_PART_INDEX';
export const ADD_LIKE_TO_CURRENT_STORY =
  '@REDUX_ONLY/ADD_LIKE_TO_CURRENT_STORY';

interface CurrentStory {
  currentPart: number;
}

export type StoryState = (Story & CurrentStory) | null;

interface UpdateCurrentPartIndex {
  type: typeof UPDATE_CURRENT_PART_INDEX;
  payload: {
    currentPart: number;
  };
}

interface LikeToStoryAction {
  type: typeof ADD_LIKE_TO_CURRENT_STORY;
  payload: {
    userId: string;
    option: LikeActions;
  };
}

interface UpdateStoryAction {
  type: typeof UPDATE_CURRENT_STORY;
  payload: {
    story: Story;
  };
}

interface AddViewToStory {
  type: typeof ADD_VIEW_TO_STORY;
  payload: {
    userId: string;
    story: Story;
  };
}

export type StoryActionTypes =
  | LikeToStoryAction
  | UpdateStoryAction
  | UpdateCurrentPartIndex
  | AddViewToStory;

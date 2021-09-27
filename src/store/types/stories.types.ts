import {Story, StoryPartComment} from 'interfaces/story';

export const UPDATE_STORIES = 'UPDATE_STORIES';
export const UPDATE_DATA_STORIES = 'UPDATE_DATA_STORIES';
export const ASYNC_UPDATE_DATA_STORIES = 'ASYNC_UPDATE_DATA_STORIES';
export const ADD_COMMENT_TO_STORY = 'ADD_COMMENT_TO_STORY';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const ADD_LIKE_TO_STORY = '@REDUX_ONLY/ADD_LIKE_TO_STORY';

export interface StoriesState {
  docs: Story[];
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

interface LikeToStoryAction {
  type: typeof ADD_LIKE_TO_STORY;
  payload: {
    storyId: string;
    userId: string;
    storyPartIndex: number;
    option: string;
  };
}

interface AsyncUpdateDataStoriesAction {
  type: typeof ASYNC_UPDATE_DATA_STORIES;
  payload: {data: StoriesState};
}

interface UpdateDataStoriesAction {
  type: typeof UPDATE_DATA_STORIES;
  payload: {data: StoriesState};
}

interface UpdateStoriesAction {
  type: typeof UPDATE_STORIES;
  payload: {docs: Array<Story>};
}

interface AddCommentStoriesAction {
  type: typeof ADD_COMMENT_TO_STORY;
  payload: {indexPart: number; comment: StoryPartComment};
}

interface UpdateCommentAction {
  type: typeof UPDATE_COMMENT;
  payload: {indexPart: number; indexComment: number; comment: StoryPartComment};
}

interface DeleteCommentAction {
  type: typeof DELETE_COMMENT;
  payload: {indexPart: number; indexComment: number};
}

export type StoriesActionTypes =
  | LikeToStoryAction
  | AsyncUpdateDataStoriesAction
  | UpdateStoriesAction
  | UpdateDataStoriesAction
  | AddCommentStoriesAction
  | UpdateCommentAction
  | DeleteCommentAction;

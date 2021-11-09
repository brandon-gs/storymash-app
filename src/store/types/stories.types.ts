import {Paginate} from 'interfaces/global';
import {Story, StoryPartComment} from 'interfaces/story';

export const UPDATE_STORIES = '@STORIES/UPDATE_STORIES';
export const UPDATE_DATA_STORIES = '@STORIES/UPDATE_DATA_STORIES';
export const ASYNC_UPDATE_DATA_STORIES = '@STORIES/ASYNC_UPDATE_DATA_STORIES';
export const ADD_COMMENT_TO_STORY = '@STORIES/ADD_COMMENT_TO_STORY';
export const UPDATE_COMMENT = '@STORIES/UPDATE_COMMENT';
export const DELETE_COMMENT = '@STORIES/DELETE_COMMENT';
export const ADD_LIKE_TO_STORY = '@STORIES@REDUX_ONLY/ADD_LIKE_TO_STORY';

export type StoriesState = Paginate<Story>;

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

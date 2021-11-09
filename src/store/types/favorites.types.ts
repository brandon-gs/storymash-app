import {StoriesState} from './stories.types';

export const SET_FAVORITES_STORIES = '@FAVORITES/SET_FAVORITES_STORIES';
export const LIKE_FAVORITE_STORY = '@FAVORITES/LIKE_FAVORITE_STORY';

export type FavoritesStoriesState = StoriesState;

interface SetFavoritesStories {
  type: typeof SET_FAVORITES_STORIES;
  payload: {
    data: StoriesState;
  };
}

interface LikeToFavoriteStoryAction {
  type: typeof LIKE_FAVORITE_STORY;
  payload: {
    storyId: string;
    userId: string;
    storyPartIndex: number;
    option: string;
  };
}

export type FavoritesStoriesActionTypes =
  | SetFavoritesStories
  | LikeToFavoriteStoryAction;

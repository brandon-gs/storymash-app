import * as favoritesAPI from 'api/favorites';
import {LikeActions} from 'hooks/useLikeButton';
import {Dispatch} from 'redux';
import {RootState} from 'store/types';
import {
  FavoritesStoriesActionTypes,
  LIKE_FAVORITE_STORY,
  SET_FAVORITES_STORIES,
} from 'store/types/favorites.types';

export const getFavoritesStories = (page = -1, limit = -1) => {
  return async (
    dispatch: Dispatch<FavoritesStoriesActionTypes>,
    getState: () => RootState,
  ) => {
    const prevDataRankStories = getState().rank;
    try {
      const currentPage = page >= 0 ? page : prevDataRankStories.page;
      const currentLimit = limit >= 0 ? limit : prevDataRankStories.limit;
      const rankStoriesPagination = await favoritesAPI.getFavoritesStories(
        currentLimit,
        currentPage,
      );
      dispatch({
        type: SET_FAVORITES_STORIES,
        payload: {data: rankStoriesPagination},
      });
    } catch (e) {
      console.log('Error getting rank stories');
    }
  };
};

// Actions
export const likeStoryAction = (
  storyId: string,
  storyPartIndex: number,
  option: LikeActions,
  userId: string,
) => {
  return (dispatch: any) => {
    dispatch({
      type: LIKE_FAVORITE_STORY,
      payload: {
        storyId,
        storyPartIndex,
        userId,
        option,
      },
    });
  };
};

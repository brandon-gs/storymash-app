import * as rankAPI from 'api/rank';
import {LikeActions} from 'hooks/useButtonLike';
import {Dispatch} from 'redux';
import {RootState} from 'store/types';
import {
  LIKE_RANK_STORY,
  RankStoriesActionTypes,
  SET_RANK_STORIES,
} from 'store/types/rank.types';

export const getRankStories = (page = -1, limit = -1) => {
  return async (
    dispatch: Dispatch<RankStoriesActionTypes>,
    getState: () => RootState,
  ) => {
    const prevDataRankStories = getState().rank;
    try {
      const currentPage = page >= 0 ? page : prevDataRankStories.page;
      const currentLimit = limit >= 0 ? limit : prevDataRankStories.limit;
      const rankStoriesPagination = await rankAPI.getRankStories(
        currentLimit,
        currentPage,
      );
      dispatch({
        type: SET_RANK_STORIES,
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
  return (dispatch: Dispatch<RankStoriesActionTypes>) => {
    dispatch({
      type: LIKE_RANK_STORY,
      payload: {
        storyId,
        storyPartIndex,
        userId,
        option,
      },
    });
  };
};

import * as rankAPI from 'api/rank';
import {Dispatch} from 'redux';
import {RootState} from 'store/types';
import {RankStoriesActionTypes, SET_RANK_STORIES} from 'store/types/rank.types';

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

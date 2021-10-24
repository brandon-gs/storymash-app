import * as plankAPI from 'api/plank';
import {LikeActions} from 'hooks/useButtonLike';
import {Dispatch} from 'redux';
import {RootState} from 'store/types';
import {
  PlankStoriesActionTypes,
  LIKE_PLANK_STORY,
  SET_PLANK_STORIES,
} from 'store/types/plank.types';

export const getPlankStories = (page = -1, limit = -1) => {
  return async (
    dispatch: Dispatch<PlankStoriesActionTypes>,
    getState: () => RootState,
  ) => {
    const prevDataRankStories = getState().plank;
    try {
      const currentPage = page >= 0 ? page : prevDataRankStories.page;
      const currentLimit = limit >= 0 ? limit : prevDataRankStories.limit;
      const plankStoriesPagination = await plankAPI.getPlankStories(
        currentLimit,
        currentPage,
      );
      dispatch({
        type: SET_PLANK_STORIES,
        payload: {data: plankStoriesPagination},
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
      type: LIKE_PLANK_STORY,
      payload: {
        storyId,
        storyPartIndex,
        userId,
        option,
      },
    });
  };
};

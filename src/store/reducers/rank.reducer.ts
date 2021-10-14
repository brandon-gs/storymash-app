import {
  RankStoriesActionTypes,
  RankStoriesState,
  SET_RANK_STORIES,
} from 'store/types/rank.types';

const initialRankStoriesState: RankStoriesState = {
  docs: [],
  totalDocs: 0,
  offset: 0,
  limit: 9,
  totalPages: 0,
  page: 0,
  pagingCounter: 0,
  hasPrevPage: false,
  hasNextPage: true,
  prevPage: null,
  nextPage: 1,
};

export default function rankStoriesReducer(
  state = initialRankStoriesState,
  action: RankStoriesActionTypes,
): RankStoriesState {
  switch (action.type) {
    case SET_RANK_STORIES: {
      return action.payload.data;
    }
    default: {
      return state;
    }
  }
}

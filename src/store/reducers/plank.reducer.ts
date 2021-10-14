import {
  PlankStoriesActionTypes,
  PlankStoriesState,
  LIKE_PLANK_STORY,
  SET_PLANK_STORIES,
} from 'store/types/plank.types';
import {addOrRemoveLikeMap} from 'utils/stories';

const initialRankStoriesState: PlankStoriesState = {
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

export default function plankStoriesReducer(
  state = initialRankStoriesState,
  action: PlankStoriesActionTypes,
): PlankStoriesState {
  switch (action.type) {
    case SET_PLANK_STORIES: {
      return action.payload.data;
    }
    case LIKE_PLANK_STORY: {
      const {option, storyId, storyPartIndex, userId} = action.payload;

      if (option !== 'add' && option !== 'remove') {
        return {...state};
      }

      return {
        ...state,
        docs: state.docs.map(
          addOrRemoveLikeMap(storyId, storyPartIndex, userId, option),
        ),
      };
    }
    default: {
      return state;
    }
  }
}

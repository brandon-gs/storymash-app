import {
  FavoritesStoriesActionTypes,
  FavoritesStoriesState,
  LIKE_FAVORITE_STORY,
  SET_FAVORITES_STORIES,
} from 'store/types/favorites.types';
import {addOrRemoveLikeMap} from 'utils/stories';

const initialRankStoriesState: FavoritesStoriesState = {
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

export default function favoritesStoriesReducer(
  state = initialRankStoriesState,
  action: FavoritesStoriesActionTypes,
): FavoritesStoriesState {
  switch (action.type) {
    case SET_FAVORITES_STORIES: {
      return action.payload.data;
    }
    case LIKE_FAVORITE_STORY: {
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

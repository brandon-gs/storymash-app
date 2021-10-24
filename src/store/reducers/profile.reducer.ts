import {
  ADD_LIKE_TO_PROFILE_STORY,
  ProfileActionTypes,
  ProfileState,
  PROFILE_FOLLOW_USER,
  PROFILE_UNFOLLOW_USER,
  SET_PROFILE,
  SET_PROFILE_STORIES,
  PROFILE_DISABLE_FOLLOW_LOADING,
  PROFILE_ENABLE_FOLLOW_LOADING,
} from 'store/types/profile.types';
import {addOrRemoveLikeMap} from 'utils/stories';

const initialState: ProfileState = {
  loadingFollow: false,
  user: null,
  stories: {
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
  },
};

export default function profileReducer(
  state = initialState,
  action: ProfileActionTypes,
): ProfileState {
  switch (action.type) {
    case SET_PROFILE: {
      const {profile} = action.payload;
      return {...state!, user: profile};
    }

    case SET_PROFILE_STORIES: {
      return {...state!, stories: action.payload};
    }

    case ADD_LIKE_TO_PROFILE_STORY: {
      const {option, storyId, storyPartIndex, userId} = action.payload;

      if (option !== 'add' && option !== 'remove') {
        return {...state};
      }

      return {
        ...state,
        stories: {
          ...state.stories,
          docs: state.stories.docs.map(
            addOrRemoveLikeMap(storyId, storyPartIndex, userId, option),
          ),
        },
      };
    }

    case PROFILE_FOLLOW_USER: {
      const profile = action.payload;
      if (!state.user) {
        return {...state};
      }
      return {
        ...state,
        user: profile,
      };
    }

    case PROFILE_UNFOLLOW_USER: {
      const profile = action.payload;
      if (!state.user) {
        return {...state};
      }
      return {
        ...state,
        user: profile,
      };
    }

    case PROFILE_ENABLE_FOLLOW_LOADING: {
      return {
        ...state,
        loadingFollow: true,
      };
    }

    case PROFILE_DISABLE_FOLLOW_LOADING: {
      return {
        ...state,
        loadingFollow: false,
      };
    }

    default: {
      return state;
    }
  }
}

import {DEFAULT_PAGINATE} from 'constants/paginate';
import {
  DISABLE_SEARCH_LOADING,
  ENABLE_SEARCH_LOADING,
  SearchActionTypes,
  SearchState,
  SET_SEARCH_PROFILES,
  SET_SEARCH_QUERY,
  SET_SEARCH_RESULTS,
  SET_SEARCH_STORIES,
  SEARCH_FOLLOW_PROFILE,
  SEARCH_UNFOLLOW_PROFILE,
} from 'store/types/search.types';

const initialState: SearchState = {
  stories: DEFAULT_PAGINATE,
  profiles: DEFAULT_PAGINATE,
  query: '',
  loading: false,
};

export default function searchReducer(
  state = initialState,
  action: SearchActionTypes,
): SearchState {
  switch (action.type) {
    case ENABLE_SEARCH_LOADING: {
      return {...state, loading: true};
    }
    case DISABLE_SEARCH_LOADING: {
      return {...state, loading: false};
    }
    case SET_SEARCH_QUERY: {
      const {query} = action.payload;
      return {...state, query};
    }
    case SET_SEARCH_RESULTS: {
      const {profiles, stories} = action.payload;
      return {...state, profiles, stories};
    }
    case SET_SEARCH_STORIES: {
      const {stories} = action.payload;
      return {...state, stories};
    }
    case SET_SEARCH_PROFILES: {
      const {profiles} = action.payload;
      return {...state, profiles};
    }
    case SEARCH_FOLLOW_PROFILE: {
      const {profileId, userId} = action.payload;
      return {
        ...state,
        profiles: {
          ...state.profiles,
          docs: state.profiles.docs.map(profile => {
            if (profile._id === profileId) {
              return {...profile, followers: [...profile.followers, userId]};
            }
            return profile;
          }),
        },
      };
    }
    case SEARCH_UNFOLLOW_PROFILE: {
      const {profileId, userId} = action.payload;
      return {
        ...state,
        profiles: {
          ...state.profiles,
          docs: state.profiles.docs.filter(profile => {
            if (profile._id === profileId) {
              return {
                ...profile,
                followers: profile.followers.filter(
                  followerId => followerId !== userId,
                ),
              };
            }
            return profile;
          }),
        },
      };
    }
    default: {
      return state;
    }
  }
}

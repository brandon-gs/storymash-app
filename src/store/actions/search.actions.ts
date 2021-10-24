import * as searchAPI from 'api/search';
import {Dispatch} from 'redux';
import {RootState} from 'store/types';
import {
  DISABLE_SEARCH_LOADING,
  ENABLE_SEARCH_LOADING,
  SearchActionTypes,
  SET_SEARCH_PROFILES,
  SET_SEARCH_QUERY,
  SET_SEARCH_RESULTS,
  SET_SEARCH_STORIES,
  SEARCH_FOLLOW_PROFILE,
  SEARCH_UNFOLLOW_PROFILE,
} from 'store/types/search.types';

export const setQuery = (query: string) => {
  return (dispatch: Dispatch<SearchActionTypes>) => {
    dispatch({
      type: SET_SEARCH_QUERY,
      payload: {
        query,
      },
    });
  };
};

export const getSearchResults = () => {
  return async (
    dispatch: Dispatch<SearchActionTypes>,
    getState: () => RootState,
  ) => {
    const {query} = getState().search;
    dispatch({
      type: ENABLE_SEARCH_LOADING,
    });

    try {
      const {profiles, stories} = await searchAPI.getSearchResults(query);
      dispatch({
        type: SET_SEARCH_RESULTS,
        payload: {profiles, stories},
      });
    } catch (e) {
      console.log(JSON.stringify(e));
      console.log('Error on search');
    }

    dispatch({
      type: DISABLE_SEARCH_LOADING,
    });
  };
};

export const setProfiles = (page = -1, limit = -1) => {
  return async (
    dispatch: Dispatch<SearchActionTypes>,
    getState: () => RootState,
  ) => {
    dispatch({
      type: ENABLE_SEARCH_LOADING,
    });
    const query = getState().search.query;
    const prevDataProfiles = getState().search.profiles;
    const currentPage = page >= 0 ? page : prevDataProfiles.page;
    const currentLimit = limit >= 0 ? limit : prevDataProfiles.limit;
    try {
      const profiles = await searchAPI.getProfilesByQuery(
        query,
        currentLimit,
        currentPage,
      );
      dispatch({
        type: SET_SEARCH_PROFILES,
        payload: {profiles},
      });
    } catch (e) {
      // Todo show an error
      console.log(JSON.stringify(e));
      console.log('Error getting profiles');
    }
    dispatch({
      type: DISABLE_SEARCH_LOADING,
    });
  };
};

export const setStories = (page = -1, limit = -1) => {
  return async (
    dispatch: Dispatch<SearchActionTypes>,
    getState: () => RootState,
  ) => {
    dispatch({
      type: ENABLE_SEARCH_LOADING,
    });
    const query = getState().search.query;
    const prevDataProfiles = getState().search.stories;
    const currentPage = page >= 0 ? page : prevDataProfiles.page;
    const currentLimit = limit >= 0 ? limit : prevDataProfiles.limit;
    try {
      const stories = await searchAPI.getStoriesByQuery(
        query,
        currentLimit,
        currentPage,
      );
      dispatch({
        type: SET_SEARCH_STORIES,
        payload: {stories},
      });
    } catch (e) {
      // Todo show an error
      console.log(JSON.stringify(e));
      console.log('Error getting stories by query');
    }
    dispatch({
      type: DISABLE_SEARCH_LOADING,
    });
  };
};

export const followProfile = (profileId: string) => {
  return (dispatch: Dispatch<SearchActionTypes>, getState: () => RootState) => {
    const id = getState().authentication.user?._id;
    if (id) {
      dispatch({
        type: SEARCH_FOLLOW_PROFILE,
        payload: {
          profileId,
          userId: id,
        },
      });
    }
  };
};

export const unfollowProfile = (profileId: string) => {
  return (dispatch: Dispatch<SearchActionTypes>, getState: () => RootState) => {
    const id = getState().authentication.user?._id;
    if (id) {
      dispatch({
        type: SEARCH_UNFOLLOW_PROFILE,
        payload: {
          profileId,
          userId: id,
        },
      });
    }
  };
};

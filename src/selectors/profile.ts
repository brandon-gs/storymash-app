import {RootState} from 'store/types';

export const getFollowLoading = (state: RootState) =>
  state.profile.loadingFollow;

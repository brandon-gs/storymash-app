import {User} from 'interfaces/user';
import {StoriesState} from 'store/types/stories.types';
import axios from 'utils/axios';
// Helpers
const getProfileStoriesUrl = (
  username: string,
  currentLimit: number,
  currentPage: number,
) => {
  const defaultQuery = `limit=${currentLimit}&page=${currentPage}&offset=${
    currentPage * currentLimit
  }`;
  return `/story/user/${username}?${defaultQuery}`;
};

// API requests
export const getProfile = async (profileUsername: string) => {
  const {data} = await axios.get(`/user/profile/${profileUsername}`);
  return data as GetProfileResponse;
};

export const getProfileStories = async (
  profileUsername: string,
  currentLimit: number,
  currentPage: number,
) => {
  const url = getProfileStoriesUrl(profileUsername, currentLimit, currentPage);
  const {data} = await axios.get(url);
  return data as StoriesState;
};

export const putFollowUser = async (profileUsername: string) => {
  const {data} = await axios.put(`/user/follow/${profileUsername}`);
  return data as PostFollowUserResponse;
};

export const putUnfollowUser = async (profileUsername: string) => {
  const {data} = await axios.put(`/user/unfollow/${profileUsername}`);
  return data as PostFollowUserResponse;
};

// Response types
interface GetProfileResponse {
  user: User;
}

interface PostFollowUserResponse {
  user: User;
  profile: User;
  message: string;
}

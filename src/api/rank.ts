import {StoriesState} from 'store/types/stories.types';
import axios from 'utils/axios';

export const getRankStories = async (
  currentLimit: number,
  currentPage: number,
) => {
  const url = `/story/rank?limit=${currentLimit}&page=${currentPage}&offset=${
    currentPage * currentLimit
  }`;
  const {data} = await axios.get(url);
  return data as StoriesState;
};

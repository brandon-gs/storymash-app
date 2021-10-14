import {StoriesState} from 'store/types/stories.types';
import axios from 'utils/axios';

export const getPlankStories = async (
  currentLimit: number,
  currentPage: number,
) => {
  const url = `/story/plank?limit=${currentLimit}&page=${currentPage}&offset=${
    currentPage * currentLimit
  }`;
  const {data} = await axios.get(url);
  return data as StoriesState;
};

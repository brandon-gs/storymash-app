import {Story} from 'interfaces/story';
import axios from 'utils/axios';

interface StoryResponse {
  message: string;
  story: Story;
}

export const getStory = async (storyId: string) => {
  const {data} = await axios.get(`/story/${storyId}`);
  return data as StoryResponse;
};

export const addViewToStory = async (storyId: string) => {
  const {data} = await axios.put(`/story/view/add/${storyId}`);
  return data as StoryResponse;
};

const storyAPI = {
  getStory,
  addViewToStory,
};

export default storyAPI;

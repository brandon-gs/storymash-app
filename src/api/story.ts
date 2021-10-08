import {Story, StoryPartComment} from 'interfaces/story';
import axios from 'utils/axios';

interface StoryResponse {
  message: string;
  story: Story;
}

interface CommentResponse {
  message: string;
  comment: StoryPartComment;
}

export const getStory = async (storyId: string) => {
  const {data} = await axios.get(`/story/${storyId}`);
  return data as StoryResponse;
};

export const addViewToStory = async (storyId: string) => {
  const {data} = await axios.put(`/story/view/add/${storyId}`);
  return data as StoryResponse;
};

export const postComment = async (
  storyId: string,
  storyPartIndex: number,
  content: string,
) => {
  const {data} = await axios.put(
    `/story/comment/${storyId}/${storyPartIndex}`,
    {
      content,
    },
  );
  return data as CommentResponse;
};

export const deleteComment = async (
  storyId: string,
  storyPartIndex: number,
  commentIndex: number,
) => {
  const {data} = await axios.delete(
    `/story/comment/${storyId}/${storyPartIndex}/${commentIndex}`,
  );
  return data as CommentResponse;
};

export const putComment = async (
  storyId: string,
  storyPartIndex: number,
  commentIndex: number,
  content: string,
) => {
  const {data} = await axios.put(
    `/story/comment/${storyId}/${storyPartIndex}/${commentIndex}`,
    {
      content,
    },
  );
  return data as CommentResponse;
};

const storyAPI = {
  getStory,
  addViewToStory,
  postComment,
  deleteComment,
  putComment,
};

export default storyAPI;

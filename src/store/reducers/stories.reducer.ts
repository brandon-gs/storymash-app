import {addOrRemoveLikeMap} from 'utils/stories';
import {
  UPDATE_STORIES,
  UPDATE_DATA_STORIES,
  ASYNC_UPDATE_DATA_STORIES,
  StoriesActionTypes,
  StoriesState,
  ADD_COMMENT_TO_STORY,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  ADD_LIKE_TO_STORY,
} from '../types/stories.types';

export const initialStoriesState: StoriesState = {
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

export default function storiesReducer(
  state = initialStoriesState,
  action: StoriesActionTypes,
): StoriesState {
  switch (action.type) {
    case UPDATE_STORIES:
      return {...state, docs: action.payload.docs};
    case UPDATE_DATA_STORIES:
      return {...state, ...action.payload.data};
    case ASYNC_UPDATE_DATA_STORIES:
      return action.payload.data;
    case ADD_COMMENT_TO_STORY: {
      const {indexPart, comment} = action.payload;
      const newDocs = [...state.docs];
      newDocs[0].parts[indexPart].comments.push(comment);
      return {...state, docs: newDocs};
    }
    case DELETE_COMMENT: {
      const {indexPart, indexComment} = action.payload;
      const filteredDocs = [...state.docs];
      // Filter the comment that has the idComment from payload
      filteredDocs[0].parts[indexPart].comments = filteredDocs[0].parts[
        indexPart
      ].comments.splice(indexComment, 1);
      return {...state, docs: filteredDocs};
    }
    case UPDATE_COMMENT: {
      const {indexPart, indexComment, comment} = action.payload;
      const story = state.docs[0];
      const part = story.parts[indexPart];
      const newComments = [...part.comments];
      newComments[indexComment] = comment;
      // Update new comments in story part
      part.comments = newComments;
      // Assign part with updated comments to current story
      story.parts[indexPart] = part;
      return {...state, docs: [story]};
    }
    case ADD_LIKE_TO_STORY: {
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
    default:
      return state;
  }
}

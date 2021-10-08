import {
  StoryActionTypes,
  StoryState,
  ADD_LIKE_TO_CURRENT_STORY,
  UPDATE_CURRENT_STORY,
  UPDATE_CURRENT_PART_INDEX,
  ADD_VIEW_TO_STORY,
  ADD_COMMENT_TO_CURRENT_STORY,
  REMOVE_COMMENT_FROM_CURRENT_STORY,
  EDIT_COMMENT_FROM_CURRENT_STORY,
} from 'store/types/story.types';
import {
  addCommentToStoryPart,
  addUserToStoryPartLikes,
  editCommentFromStoryPart,
  removeCommentFromStoryPart,
} from 'utils/stories';

const initialState: StoryState = null;

export default function storyReducer(
  state = initialState,
  action: StoryActionTypes,
): StoryState {
  // Always return null if the state is null
  switch (action.type) {
    // Update current story
    case UPDATE_CURRENT_STORY: {
      return {...action.payload.story, currentPart: 0};
    }
    // Update current part index
    case UPDATE_CURRENT_PART_INDEX: {
      if (state === null) {
        return null;
      }
      return {...state, currentPart: action.payload.currentPart};
    }
    // Add view to story
    case ADD_VIEW_TO_STORY: {
      if (state === null) {
        return null;
      }
      const {userId} = action.payload;
      return {...state, views: [...state.views, userId]};
    }
    // Add or remove like to the current story
    case ADD_LIKE_TO_CURRENT_STORY: {
      // If hasn't a state return null
      if (state === null) {
        return null;
      }

      const {userId, option} = action.payload;
      const storyPartIndex = state.currentPart;

      const totalLikes =
        option === 'add' ? state.totalLikes + 1 : state.totalLikes - 1;

      return {
        ...state,
        totalLikes,
        parts: state.parts.map(
          addUserToStoryPartLikes(storyPartIndex, userId, option),
        ),
      };
    }
    case ADD_COMMENT_TO_CURRENT_STORY: {
      const {comment, storyPartIndex} = action.payload;
      if (!state) {
        return null;
      }
      return {
        ...state,
        totalComments: state.totalComments + 1,
        parts: state.parts.map(addCommentToStoryPart(storyPartIndex, comment)),
      };
    }
    case REMOVE_COMMENT_FROM_CURRENT_STORY: {
      const {commentIndex, storyPartIndex} = action.payload;
      return {
        ...state!,
        totalComments: state!.totalComments - 1,
        parts: state!.parts.map(
          removeCommentFromStoryPart(storyPartIndex, commentIndex),
        ),
      };
    }
    case EDIT_COMMENT_FROM_CURRENT_STORY: {
      const {commentIndex, storyPartIndex, comment} = action.payload;
      return {
        ...state!,
        parts: state!.parts.map(
          editCommentFromStoryPart(storyPartIndex, commentIndex, comment),
        ),
      };
    }
    default:
      return state;
  }
}

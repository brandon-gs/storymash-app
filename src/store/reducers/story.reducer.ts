import {
  StoryActionTypes,
  StoryState,
  ADD_LIKE_TO_CURRENT_STORY,
  UPDATE_CURRENT_STORY,
  UPDATE_CURRENT_PART_INDEX,
  ADD_VIEW_TO_STORY,
} from 'store/types/story.types';
import {addUserToStoryPartLikes} from 'utils/stories';

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
    default:
      return state;
  }
}

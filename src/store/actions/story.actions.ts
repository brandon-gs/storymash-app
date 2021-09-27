import storyAPI from 'api/story';
import {LikeActions} from 'hooks/useLikeButton';
import {Dispatch} from 'redux';
import {
  ADD_LIKE_TO_CURRENT_STORY,
  UPDATE_CURRENT_STORY,
  StoryActionTypes,
  UPDATE_CURRENT_PART_INDEX,
  ADD_VIEW_TO_STORY,
  StoryState,
} from 'store/types/story.types';

// Actions
const updateCurrentStory = (storyId: string) => {
  return async (dispatch: Dispatch<StoryActionTypes>) => {
    try {
      const {story} = await storyAPI.getStory(storyId);
      dispatch({type: UPDATE_CURRENT_STORY, payload: {story}});
    } catch (e) {
      // TODO: show an error
      console.log(JSON.stringify(e));
      console.error('NO se pudo obtener la historia que se quiere leer');
    }
  };
};

const updateCurrentPartIndex = (currentPart: number) => {
  return (dispatch: Dispatch<StoryActionTypes>) => {
    dispatch({
      type: UPDATE_CURRENT_PART_INDEX,
      payload: {
        currentPart,
      },
    });
  };
};

const addViewToStory = (userId: string, currentStory: StoryState) => {
  return async (dispatch: Dispatch<StoryActionTypes>) => {
    if (currentStory && userId && !currentStory.views.includes(userId)) {
      try {
        const {story} = await storyAPI.addViewToStory(currentStory._id);
        dispatch({type: ADD_VIEW_TO_STORY, payload: {userId, story}});
      } catch (e) {
        return;
      }
    }
  };
};

const likeStoryAction = (option: LikeActions, userId: string) => {
  return (dispatch: Dispatch<StoryActionTypes>) => {
    dispatch({
      type: ADD_LIKE_TO_CURRENT_STORY,
      payload: {
        option,
        userId,
      },
    });
  };
};

export default {
  addViewToStory,
  updateCurrentStory,
  updateCurrentPartIndex,
  likeStoryAction,
};

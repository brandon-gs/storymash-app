import storyAPI from 'api/story';
import {LikeActions} from 'hooks/useLikeButton';
import {Dispatch} from 'redux';
import {
  ADD_LIKE_TO_CURRENT_STORY,
  UPDATE_CURRENT_STORY,
  UPDATE_CURRENT_PART_INDEX,
  ADD_COMMENT_TO_CURRENT_STORY,
  ADD_VIEW_TO_STORY,
  StoryActionTypes,
  StoryState,
  REMOVE_COMMENT_FROM_CURRENT_STORY,
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

const addComment = (
  storyId: string,
  storyPartIndex: number,
  content: string,
) => {
  return async (dispatch: Dispatch<StoryActionTypes>) => {
    try {
      const {comment} = await storyAPI.postComment(
        storyId,
        storyPartIndex,
        content,
      );
      dispatch({
        type: ADD_COMMENT_TO_CURRENT_STORY,
        payload: {comment, storyPartIndex},
      });
    } catch (e) {
      // Todo show an error
      console.log(JSON.stringify(e));
      console.log('Error adding comment');
    }
  };
};

const removeComment = (
  storyId: string,
  storyPartIndex: number,
  commentIndex: number,
) => {
  return async (dispatch: Dispatch<StoryActionTypes>) => {
    try {
      await storyAPI.deleteComment(storyId, storyPartIndex, commentIndex);
      dispatch({
        type: REMOVE_COMMENT_FROM_CURRENT_STORY,
        payload: {
          commentIndex,
          storyPartIndex,
          storyId,
        },
      });
    } catch (e) {
      console.log(JSON.stringify(e));
      console.log('Error al eliminar el comentario');
    }
  };
};

export default {
  addViewToStory,
  updateCurrentStory,
  updateCurrentPartIndex,
  likeStoryAction,
  addComment,
  removeComment,
};

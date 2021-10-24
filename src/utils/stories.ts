/**
 * Helpers functions to avoid muttability in redux actions
 * Some functions are repeated in different reducers
 * like: stories, profile, story, etc
 */
import {LikeActions} from 'hooks/useButtonLike';
import {Story, StoryPart, StoryPartComment} from 'interfaces/story';

export const addOrRemoveLikeMap =
  (
    storyId: string,
    storyPartIdx: number,
    userId: string,
    option: LikeActions,
  ) =>
  (story: Story) => {
    if (story._id === storyId) {
      const totalLikes =
        option === 'add' ? story.totalLikes + 1 : story.totalLikes - 1;
      return {
        ...story,
        totalLikes,
        parts: story.parts.map(
          addUserToStoryPartLikes(storyPartIdx, userId, option),
        ),
      };
    }
    return story;
  };

export const addUserToStoryPartLikes =
  (storyPartIdx: number, userId: string, option: LikeActions) =>
  (part: StoryPart, index: number): StoryPart => {
    if (storyPartIdx === index) {
      if (option === 'add') {
        return {...part, likes: part.likes.concat(userId)};
      }
      return {...part, likes: part.likes.filter(likeId => likeId !== userId)};
    }
    return part;
  };

export const addCommentToStoryPart =
  (storyPartIdx: number, comment: StoryPartComment) =>
  (part: StoryPart, index: number): StoryPart => {
    if (index === storyPartIdx) {
      return {...part, comments: [comment, ...part.comments]};
    }
    return part;
  };

export const removeCommentFromStoryPart =
  (partIdx: number, commentIdx: number) => (part: StoryPart, index: number) => {
    if (index === partIdx) {
      return {
        ...part,
        comments: part.comments.filter(
          (_, currentCommentIdx) => currentCommentIdx !== commentIdx,
        ),
      };
    }
    return part;
  };

export const editCommentFromStoryPart =
  (partIdx: number, commentIdx: number, updatedComment: StoryPartComment) =>
  (part: StoryPart, index: number) => {
    if (index === partIdx) {
      return {
        ...part,
        comments: part.comments.map((comment, commentIndex) => {
          if (commentIndex === commentIdx) {
            return updatedComment;
          }
          return comment;
        }),
      };
    }
    return part;
  };

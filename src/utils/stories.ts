import {LikeActions} from 'hooks/useLikeButton';
import {Story, StoryPart} from 'interfaces/story';

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

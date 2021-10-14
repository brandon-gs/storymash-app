import {useThunkDispatch} from 'hooks';
import {Story} from 'interfaces/story';
import {useCallback} from 'react';
import {useSelector} from 'react-redux';
import actions from 'store/actions';
import axios from 'utils/axios';

export type LikeActions = 'add' | 'remove' | '';

const useLikeButton = () => {
  const dispatch = useThunkDispatch();
  const {
    authentication: {user},
  } = useSelector(state => state);

  const addOrRemoveLike = useCallback(
    async (story: Story, storyPartIndex: number) => {
      const option: LikeActions =
        user && story.parts[storyPartIndex].likes.includes(user._id)
          ? 'remove'
          : user && !story.parts[storyPartIndex].likes.includes(user._id)
          ? 'add'
          : '';
      if (user) {
        try {
          // Update button icon
          dispatch(
            actions.stories.likeStoryAction(
              story._id,
              storyPartIndex,
              option,
              user._id,
            ),
          );
          dispatch(
            actions.profile.likeProfileStory(
              story._id,
              storyPartIndex,
              option,
              user._id,
            ),
          );
          dispatch(
            actions.rank.likeStoryAction(
              story._id,
              storyPartIndex,
              option,
              user._id,
            ),
          );
          dispatch(
            actions.favorites.likeStoryAction(
              story._id,
              storyPartIndex,
              option,
              user._id,
            ),
          );
          dispatch(actions.story.likeStoryAction(option, user._id));
          await axios.put(
            `/story/part/like/${option}/${story._id}/${storyPartIndex}`,
            {
              option,
            },
          );
          // TODO: Create favorites reducer to add the story when user press like
          // TODO: Create profile reducer to update profile points, etc, when add like on her profile screen
          dispatch(actions.favorites.getFavoritesStories());
          // dispatch(actions.updateProfile(data.author));
        } catch (error) {
          // TODO: Create a reducer to create a global Alert
          console.log(JSON.stringify(error));
          // dispatch(
          //   actions.updateAlert({
          //     message: 'Algo salió mal, intentalo más tarde',
          //     severity: 'error',
          //     open: true,
          //   }),
          // );
        }
      }
    },
    [dispatch, user],
  );

  return {addOrRemoveLike};
};

export default useLikeButton;

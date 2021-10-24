import React, {useCallback} from 'react';
import {Box} from 'components';
import {useLoader} from 'hooks';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator, FlatList, ListRenderItemInfo} from 'react-native';
import {useTheme} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {Story} from 'interfaces/story';
import useLikeButton from 'hooks/useButtonLike';
import {
  AuthStackRoutes,
  ProfileScreenProp,
  ReadStoryScreenProp,
} from 'navigation/AuthStackNavigation';
import StoryItem from './StoryCardItem';
import EmptyStories from './EmptyStories';
import actions from 'store/actions';

export interface ListStoriesProps {
  EmptyComponent?:
    | React.ComponentType<any>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  stories: Story[];
  hasNextPage: boolean;
  onRefresh?: () => Promise<void> | void;
  onEndReached: () => Promise<void> | void;
}

function ListStories({
  EmptyComponent = EmptyStories,
  hasNextPage,
  stories,
  onRefresh,
  onEndReached,
}: ListStoriesProps) {
  const {theme} = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation<ReadStoryScreenProp | ProfileScreenProp>();

  const user = useSelector(state => state.authentication.user);

  const keyExtractor = useCallback((item: Story) => item._id, []);

  // Like actions
  const {addOrRemoveLike} = useLikeButton();

  // State
  const [refreshing, enableRefresh, disableRefresh] = useLoader(false);
  const [loading, enableLoading, disableLoading] = useLoader(false);

  // Redirect to read story screen
  const handleItemPress = useCallback(
    (story: Story) => {
      navigation.navigate(AuthStackRoutes.ReadStory, {
        storyId: story._id,
      });
    },
    [navigation],
  );

  // Redirect to profile screen
  const handleGoToProfile = useCallback(
    (authorUsername: string) => {
      navigation.navigate(AuthStackRoutes.Profile, {
        profileUsername: authorUsername,
      });
    },
    [navigation],
  );

  // Add or remove like in a story
  const handleButtonLikePress = useCallback(
    async (story: Story) => {
      // Default use the part 0 because always render it
      const storyPartIndex = 0;
      dispatch(actions.story.updateCurrentPartIndex(storyPartIndex));
      await addOrRemoveLike(story, storyPartIndex);
    },
    [dispatch, addOrRemoveLike],
  );

  const renderItem = (props: ListRenderItemInfo<Story>) => {
    const liked = props.item.parts[0].likes.includes(user?._id || '');
    return user ? (
      <StoryItem
        user={user}
        liked={liked}
        onPress={handleItemPress}
        onPressLike={handleButtonLikePress}
        goToProfile={handleGoToProfile}
        {...props}
      />
    ) : null;
  };

  const renderLoader = () => {
    return loading ? (
      <Box my={8} alignItems="center">
        <ActivityIndicator size="large" color={theme.colors?.primary} />
      </Box>
    ) : null;
  };

  return (
    <FlatList
      data={stories}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListFooterComponent={renderLoader}
      refreshing={refreshing}
      ListEmptyComponent={
        EmptyComponent ? EmptyComponent : <EmptyStories onRefresh={onRefresh} />
      }
      onRefresh={
        onRefresh
          ? async () => {
              enableRefresh();
              // Do an api call to page 0 when do onRefresh
              await onRefresh();
              disableRefresh();
            }
          : undefined
      }
      onEndReached={async () => {
        if (hasNextPage) {
          enableLoading();
          await onEndReached();
          disableLoading();
        }
      }}
    />
  );
}

export default ListStories;

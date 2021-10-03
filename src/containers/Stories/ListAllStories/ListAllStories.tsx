import React, {useCallback, useState} from 'react';
import {Box} from 'components';
import {useThunkDispatch} from 'hooks';
import {useSelector} from 'react-redux';
import actions from 'store/actions';
import {ActivityIndicator, FlatList, ListRenderItemInfo} from 'react-native';
import {useTheme} from 'react-native-elements';
import StoryItem from './StoryCardItem';
import {useNavigation} from '@react-navigation/native';
import {Story} from 'interfaces/story';
import useLikeButton from 'hooks/useLikeButton';
import {
  AuthStackRoutes,
  ReadStoryScreenProp,
} from 'navigation/AuthStackNavigation';
import EmptyStories from './EmptyStories';

export interface ListStoriesProps {
  hasNextPage: boolean;
}

function ListAllStories({hasNextPage}: ListStoriesProps) {
  const navigation = useNavigation<ReadStoryScreenProp>();
  const dispatch = useThunkDispatch();
  const user = useSelector(state => state.authentication.user);
  const stories = useSelector(state => state.stories.docs);
  const {theme} = useTheme();

  const keyExtractor = useCallback((item: Story) => item._id, []);

  // Like actions
  const {addOrRemoveLike} = useLikeButton();

  // State
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const enableLoading = () => setLoading(true);
  const disableLoading = () => setLoading(false);
  const enableRefresh = () => setRefreshing(true);
  const disableRefresh = () => setRefreshing(false);

  const handleItemPress = useCallback(
    (story: Story) => {
      navigation.navigate(AuthStackRoutes.ReadStory, {
        storyId: story._id,
      });
    },
    [navigation],
  );

  const handleButtonLikePress = useCallback(
    async (story: Story) => {
      // Default use the part 0 because always render it
      const storyPartIndex = 0;
      await addOrRemoveLike(story, storyPartIndex);
    },
    [addOrRemoveLike],
  );

  const renderItem = (props: ListRenderItemInfo<Story>) => {
    const liked = props.item.parts[0].likes.includes(user?._id || '');
    return user ? (
      <StoryItem
        user={user}
        liked={liked}
        onPress={handleItemPress}
        onPressLike={handleButtonLikePress}
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
      ListEmptyComponent={EmptyStories}
      onRefresh={() => {
        enableRefresh();
        // Do an api call to page 0 when do onRefresh
        dispatch(actions.stories.asyncUpdateDataStories(0));
        disableRefresh();
      }}
      onEndReached={() => {
        if (hasNextPage) {
          enableLoading();
          dispatch(actions.stories.asyncUpdateDataStories());
          disableLoading();
        }
      }}
    />
  );
}

export default ListAllStories;

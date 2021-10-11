import React, {useCallback} from 'react';
import {Box} from 'components';
import {useLoader, useThunkDispatch} from 'hooks';
import {useSelector} from 'react-redux';
import actions from 'store/actions';
import {ActivityIndicator, FlatList, ListRenderItemInfo} from 'react-native';
import {useTheme} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {Story} from 'interfaces/story';
import useLikeButton from 'hooks/useLikeButton';
import {
  AuthStackRoutes,
  ProfileScreenProp,
  ReadStoryScreenProp,
} from 'navigation/AuthStackNavigation';
import {EmptyStories, StoryCardItem} from 'containers';
import {User} from 'interfaces/user';
import InfoProfile from './InfoProfile';

export interface StoriesProfileProps {
  profile: User;
}

function StoriesProfile({profile}: StoriesProfileProps) {
  const navigation = useNavigation<ReadStoryScreenProp | ProfileScreenProp>();
  const dispatch = useThunkDispatch();
  const user = useSelector(state => state.authentication.user);
  const stories = useSelector(state => state.profile.stories);
  const {theme} = useTheme();

  const keyExtractor = useCallback((item: Story) => item._id, []);

  // Like actions
  const {addOrRemoveLike} = useLikeButton();

  // State
  const [refreshing, enableRefresh, disableRefresh] = useLoader(false);
  const [loading, enableLoading, disableLoading] = useLoader(false);

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
      <StoryCardItem
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
      data={stories.docs}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListFooterComponent={renderLoader}
      refreshing={refreshing}
      ListHeaderComponent={<InfoProfile profile={profile} />}
      ListEmptyComponent={EmptyStories}
      onRefresh={() => {
        enableRefresh();
        // Do an api call to page 0 when do onRefresh
        dispatch(actions.profile.setProfile(profile.username));
        dispatch(actions.profile.setProfileStories(profile.username, 0));
        disableRefresh();
      }}
      onEndReached={() => {
        if (stories.hasNextPage) {
          enableLoading();
          dispatch(actions.profile.setProfileStories(profile.username));
          disableLoading();
        }
      }}
    />
  );
}

export default StoriesProfile;

import React, {useCallback, useEffect, useState} from 'react';
import {useRoute, RouteProp} from '@react-navigation/core';
import {useThunkDispatch} from 'hooks';
import {AuthStackParams, AuthStackRoutes} from 'navigation/AuthStackNavigation';
import {StyleSheet, ScrollView, RefreshControl} from 'react-native';
import actions from 'store/actions';
import {Loader} from 'components';
import {ReadStory} from 'containers';
import {useSelector} from 'react-redux';

const ReadStoryScreen = () => {
  const route =
    useRoute<RouteProp<AuthStackParams, AuthStackRoutes.ReadStory>>();
  const {storyId} = route.params;

  const dispatch = useThunkDispatch();

  const user = useSelector(state => state.authentication.user);
  const story = useSelector(state => state.story);
  const storyPartIndex = useSelector(state => state.story?.currentPart);

  const partIndex = storyPartIndex || 0;

  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleLoading = (newLoading: boolean) => setLoading(newLoading);

  const handleRefreshing = (newRefreshing: boolean) =>
    setRefreshing(newRefreshing);

  const onRefresh = useCallback(async () => {
    handleRefreshing(true);
    await dispatch(actions.story.updateCurrentStory(storyId));
    handleRefreshing(false);
  }, [dispatch, storyId]);

  // Get story every time storyId changes or story is null
  useEffect(() => {
    if (!story || storyId !== story._id) {
      handleLoading(true);
      dispatch(actions.story.updateCurrentStory(storyId));
      handleLoading(false);
    } else {
      handleLoading(false);
    }
  }, [dispatch, story, storyId]);

  // Add user to views
  useEffect(() => {
    dispatch(actions.story.addViewToStory(user?._id || '', story));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [story]);

  if (!story) {
    // TODO: Redirect to home screen or prev screen
    return null;
  }

  if (loading || storyId !== story._id) {
    return <Loader />;
  }

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="always"
      keyboardDismissMode="on-drag"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <ReadStory story={story} storyPartIndex={partIndex} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});

export default ReadStoryScreen;

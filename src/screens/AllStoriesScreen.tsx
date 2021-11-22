import React, {useCallback} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {useAsync, useThunkDispatch} from 'hooks';
import {useSelector} from 'react-redux';
import actions from 'store/actions';
import {Loader} from 'components';
import {ListStories} from 'containers';
import {themeColors} from 'theme/themeColors';

const AllStoriesScreen = () => {
  const dispatch = useThunkDispatch();

  // Redux state
  const docs = useSelector(state => state.stories.docs);
  const hasNextPage = useSelector(state => state.stories.hasNextPage);

  const onRefresh = useCallback(async () => {
    await dispatch(actions.stories.asyncUpdateDataStories(0));
  }, [dispatch]);

  const onEndReached = useCallback(async () => {
    await dispatch(actions.stories.asyncUpdateDataStories());
  }, [dispatch]);

  // Get stories on the first render and when has 0 docs
  const {loading} = useAsync(async () => {
    if (docs.length === 0) {
      await dispatch(actions.stories.asyncUpdateDataStories());
    }
  }, true);

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={themeColors.main.main} />
      <ListStories
        hasNextPage={hasNextPage}
        stories={docs}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});

export default AllStoriesScreen;

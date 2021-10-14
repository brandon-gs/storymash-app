import React, {useCallback} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {useAsync, useThunkDispatch} from 'hooks';
import {useSelector} from 'react-redux';
import actions from 'store/actions';
import {Loader} from 'components';
import {ListStories} from 'containers';
import {themeColors} from 'theme/theme';

const RankStoriesScreen = () => {
  const dispatch = useThunkDispatch();

  // Redux state
  const docs = useSelector(state => state.rank.docs);
  const hasNextPage = useSelector(state => state.rank.hasNextPage);

  const onRefresh = useCallback(async () => {
    await dispatch(actions.rank.getRankStories(0));
  }, [dispatch]);

  const onEndReached = useCallback(async () => {
    await dispatch(actions.rank.getRankStories());
  }, [dispatch]);

  // Get stories on the first render and when has 0 docs
  const {loading} = useAsync(async () => {
    if (docs.length === 0) {
      await dispatch(actions.rank.getRankStories());
    }
  }, true);

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={themeColors.primary} />
      <ListStories
        hasNextPage={hasNextPage}
        stories={docs}
        onEndReached={onEndReached}
        onRefresh={onRefresh}
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

export default RankStoriesScreen;

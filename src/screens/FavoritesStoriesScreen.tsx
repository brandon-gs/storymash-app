import React, {useCallback} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {useAsync, useThunkDispatch} from 'hooks';
import {useSelector} from 'react-redux';
import actions from 'store/actions';
import {Loader} from 'components';
import {EmptyStories, ListStories} from 'containers';
import {themeColors} from 'theme/themeColors';

const FavoritesStoriesScreen = () => {
  const dispatch = useThunkDispatch();

  // Redux state
  const docs = useSelector(state => state.favorites.docs);
  const hasNextPage = useSelector(state => state.favorites.hasNextPage);

  const onRefresh = useCallback(async () => {
    await dispatch(actions.favorites.getFavoritesStories(0));
  }, [dispatch]);

  const onEndReached = useCallback(async () => {
    await dispatch(actions.favorites.getFavoritesStories());
  }, [dispatch]);

  // Get stories on the first render and when has 0 docs
  const {loading} = useAsync(async () => {
    if (docs.length === 0) {
      await dispatch(actions.favorites.getFavoritesStories());
    }
  }, true);

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={themeColors.main.main} />
      <ListStories
        EmptyComponent={
          <EmptyStories
            title="No tienes historias favoritas"
            onRefresh={onRefresh}
          />
        }
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

export default FavoritesStoriesScreen;

import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {useAsync, useThunkDispatch} from 'hooks';
import {useSelector} from 'react-redux';
import actions from 'store/actions';
import {Loader} from 'components';
import {ListAllStories} from 'containers';
import {themeColors} from 'theme/theme';

const AllStoriesScreen = () => {
  const dispatch = useThunkDispatch();

  // Redux state
  const docs = useSelector(state => state.stories.docs);
  const hasNextPage = useSelector(state => state.stories.hasNextPage);

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
      <StatusBar backgroundColor={themeColors.primary} />
      <ListAllStories hasNextPage={hasNextPage} />
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

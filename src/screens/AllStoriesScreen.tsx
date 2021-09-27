import React, {useCallback, useState} from 'react';
import {View, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {useAsync, useThunkDispatch} from 'hooks';
import {useSelector} from 'react-redux';
import actions from 'store/actions';
import {Box, Loader, StyledText} from 'components';
import {ListAllStories} from 'containers';

const AllStoriesScreen = () => {
  const dispatch = useThunkDispatch();

  // Redux state
  const docs = useSelector(state => state.stories.docs);
  const hasNextPage = useSelector(state => state.stories.hasNextPage);

  // State
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const handleRefreshing = (newRefreshing: boolean) =>
    setRefreshing(newRefreshing);

  const onRefresh = useCallback(async () => {
    handleRefreshing(true);
    await dispatch(actions.stories.asyncUpdateDataStories());
    handleRefreshing(false);
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
      {docs.length > 0 ? (
        <ListAllStories hasNextPage={hasNextPage} />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Box px={2} py={2}>
            <StyledText fsize={4} fontVariant="bold">
              No se pudieron obtener las historias
            </StyledText>
          </Box>
        </ScrollView>
      )}
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

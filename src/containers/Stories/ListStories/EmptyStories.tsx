import React, {useCallback} from 'react';
import {Box, StyledText} from 'components';
import {RefreshControl, ScrollView} from 'react-native';
import {useLoader} from 'hooks';

interface EmptyStoriesProps {
  onRefresh: () => Promise<void> | void;
}

const EmptyStories = ({onRefresh: onRefreshCallback}: EmptyStoriesProps) => {
  const [refreshing, enableRefreshing, disableRefreshing] = useLoader(false);

  const onRefresh = useCallback(async () => {
    enableRefreshing();
    // await dispatch(actions.stories.asyncUpdateDataStories());
    await onRefreshCallback();
    disableRefreshing();
  }, [onRefreshCallback, enableRefreshing, disableRefreshing]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Box px={2} py={2}>
        <StyledText fsize={4} align="center" fontVariant="bold">
          No se pudieron obtener las historias
        </StyledText>
      </Box>
    </ScrollView>
  );
};

export default EmptyStories;

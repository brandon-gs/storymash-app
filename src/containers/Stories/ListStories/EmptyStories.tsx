import React, {useCallback} from 'react';
import {Box, StyledText} from 'components';
import {RefreshControl, ScrollView} from 'react-native';
import {useLoader} from 'hooks';

interface EmptyStoriesProps {
  title?: string;
  onRefresh?: () => Promise<void> | void;
}

const EmptyStories = ({
  title = 'No se pudieron obtener las historias',
  onRefresh: onRefreshCallback,
}: EmptyStoriesProps) => {
  const [refreshing, enableRefreshing, disableRefreshing] = useLoader(false);

  const onRefresh = useCallback(async () => {
    if (onRefreshCallback) {
      enableRefreshing();
      await onRefreshCallback();
      disableRefreshing();
    }
  }, [onRefreshCallback, enableRefreshing, disableRefreshing]);

  return (
    <ScrollView
      refreshControl={
        onRefreshCallback ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }>
      <Box px={2} py={2}>
        <StyledText fsize={4} align="center" fontVariant="bold">
          {title}
        </StyledText>
      </Box>
    </ScrollView>
  );
};

export default EmptyStories;

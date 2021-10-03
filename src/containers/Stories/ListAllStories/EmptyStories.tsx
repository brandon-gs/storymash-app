import React, {useCallback, useState} from 'react';
import {Box, StyledText} from 'components';
import {RefreshControl, ScrollView} from 'react-native';
import {useThunkDispatch} from 'hooks';
import actions from 'store/actions';

const EmptyStories = () => {
  const dispatch = useThunkDispatch();

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleRefreshing = useCallback(
    (newRefreshing: boolean) => setRefreshing(newRefreshing),
    [],
  );

  const onRefresh = useCallback(async () => {
    handleRefreshing(true);
    await dispatch(actions.stories.asyncUpdateDataStories());
    handleRefreshing(false);
  }, [dispatch, handleRefreshing]);

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

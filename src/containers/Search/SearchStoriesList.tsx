import React, {useCallback} from 'react';
import {EmptyStories, ListStories} from 'containers';
import {useSelector} from 'react-redux';
import {useThunkDispatch} from 'hooks';
import actions from 'store/actions';

function SearchStoriesList() {
  const dispatch = useThunkDispatch();
  const stories = useSelector(state => state.search.stories);

  const onEndReached = useCallback(async () => {
    await dispatch(actions.search.setStories());
  }, [dispatch]);

  return (
    <ListStories
      stories={stories.docs}
      hasNextPage={stories.hasNextPage}
      EmptyComponent={<EmptyStories title="No se encontraron historias" />}
      onEndReached={onEndReached}
    />
  );
}

export default SearchStoriesList;

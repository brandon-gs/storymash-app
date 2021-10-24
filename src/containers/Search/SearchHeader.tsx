import React, {useCallback, useState} from 'react';
import {Box, SearchBar} from 'components';
import {useDispatch, useSelector} from 'react-redux';
import actions from 'store/actions';
import {useNavigation} from '@react-navigation/core';

interface SearchHeaderStackProps {
  onSearch: () => void;
}

function SearchHeader({onSearch}: SearchHeaderStackProps) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const query = useSelector(state => state.search.query);
  const loading = useSelector(state => state.search.loading);

  const [search, setSearch] = useState<string>(query);

  const handleSearch = useCallback((text: string) => {
    setSearch(text);
  }, []);

  const clearSearch = useCallback(() => {
    setSearch('');
    dispatch(actions.search.setQuery(''));
  }, [dispatch]);

  const handleSubmitSearch = async () => {
    dispatch(actions.search.setQuery(search));
    if (search) {
      onSearch();
    }
  };

  return (
    <Box>
      <SearchBar
        autoFocus
        value={search}
        onChangeText={handleSearch}
        goBack={navigation.goBack}
        clearSearch={clearSearch}
        returnKeyType="search"
        onSubmitEditing={handleSubmitSearch}
        loading={loading}
      />
    </Box>
  );
}

export default SearchHeader;

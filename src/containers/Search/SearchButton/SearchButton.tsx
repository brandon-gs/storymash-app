import React from 'react';
import {useTheme} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IconProps} from 'react-native-vector-icons/Icon';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/core';
import {
  AuthStackRoutes,
  SearchScreenProp,
} from 'navigation/AuthStackNavigation';

interface SearchButtonProps {
  icon?: Omit<IconProps, 'name'>;
}

function SearchButton({icon}: SearchButtonProps) {
  const {theme} = useTheme();

  const navigation = useNavigation<SearchScreenProp>();

  const goToSearchScreen = () => {
    navigation.navigate(AuthStackRoutes.Search);
  };

  return (
    <>
      <TouchableOpacity onPress={goToSearchScreen}>
        <Icon name="search-outline" color={theme.colors?.primary} {...icon} />
      </TouchableOpacity>
    </>
  );
}

export default SearchButton;

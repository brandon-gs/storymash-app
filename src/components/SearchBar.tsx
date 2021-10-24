import React from 'react';
import {Box} from 'components';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from 'react-native-elements';

interface SearchBarProps extends TextInputProps {
  loading: boolean;
  clearSearch: () => void;
  goBack: () => void;
}

const {width} = Dimensions.get('window');

function SearchBar({goBack, clearSearch, loading, ...props}: SearchBarProps) {
  const {theme} = useTheme();

  const showClearButton = props.value !== '';

  return (
    <Box
      direction="row"
      width="100%"
      bg="white"
      py={1}
      style={styles.container}>
      <TouchableOpacity onPress={goBack}>
        <Box px={1}>
          <Icon
            name="arrow-back-outline"
            size={30}
            color={theme.colors?.disabledIcon}
          />
        </Box>
      </TouchableOpacity>
      <Box>
        <TextInput
          placeholder="Buscar"
          {...props}
          style={[
            styles.input,
            {color: theme.colors?.disabledIcon},
            props.style,
          ]}
        />
        {showClearButton && !loading && (
          <TouchableOpacity onPress={clearSearch} style={styles.rightIcon}>
            <Box px={1}>
              <Icon name="close" size={24} color={theme.colors?.disabledIcon} />
            </Box>
          </TouchableOpacity>
        )}
        {loading && (
          <Box style={styles.rightIcon} px={1}>
            <ActivityIndicator size={24} color={theme.colors?.disabledIcon} />
          </Box>
        )}
      </Box>
    </Box>
  );
}

// width window - icon size with paddings - padding righ
const INPUT_WIDTH = width - 48 - 8;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 180,
    paddingVertical: 0,
    height: 32,
    paddingLeft: 16,
    paddingRight: 48,
    width: INPUT_WIDTH,
    fontSize: 16,
  },
  rightIcon: {
    position: 'absolute',
    right: 0,
    top: 2.5,
  },
});

export default SearchBar;

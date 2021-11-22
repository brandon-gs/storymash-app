import React from 'react';
import {Box, StyledText} from 'components';
import {StyleSheet} from 'react-native';
import {themeColors} from 'theme/themeColors';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface SettingsItemProps {
  title: string;
  iconName: string;
  onPress: () => void;
}

const SettingsItem = ({iconName, title, onPress}: SettingsItemProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        direction="row"
        alignItems="center"
        bg="white"
        px={2}
        py={1.5}
        style={styles.container}>
        <Box mr={1}>
          <Icon name={iconName} size={24} color={themeColors.main.main} />
        </Box>
        <StyledText fsize={2.5} color="primary">
          {title}
        </StyledText>
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: themeColors.border,
    borderBottomWidth: 1,
  },
});

export default SettingsItem;

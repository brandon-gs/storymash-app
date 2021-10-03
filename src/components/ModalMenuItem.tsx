import React from 'react';
import {Box, StyledText} from 'components';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {BoxProps} from './Box';
import {StyledTextProps} from './StyledText';

interface ModalMenuItemProps {
  title: string;
  iconProps: {name: string; size?: number};
  border?: boolean;
  boxProps?: BoxProps;
  textProps?: StyledTextProps;
  buttonProps?: TouchableOpacityProps;
}

const ModalMenuItem = ({
  buttonProps = {},
  boxProps = {},
  iconProps,
  textProps = {},
  border = false,
  title,
}: ModalMenuItemProps) => {
  return (
    <>
      <TouchableOpacity {...buttonProps}>
        <Box px={1} py={1.5} direction="row" {...boxProps}>
          <Icon size={24} style={styles.icon} {...iconProps} />
          <StyledText fsize={2.5} {...textProps}>
            {title}
          </StyledText>
        </Box>
      </TouchableOpacity>
      {border && <Box height={1} bg="gray" direction="row" />}
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 8,
  },
});

export default ModalMenuItem;

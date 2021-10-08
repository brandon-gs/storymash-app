import React from 'react';
import {Box, StyledText} from 'components';
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet} from 'react-native';
import {themeColors} from 'theme/theme';

interface HeaderModalCommentsProps {
  text?: string;
  commentsCount?: number;
  goBack?: () => void;
}

const HeaderModalComments = ({
  text,
  commentsCount = 0,
  goBack,
}: HeaderModalCommentsProps) => {
  return (
    <Box px={1} py={1} direction="row" style={styles.container}>
      {goBack && (
        <Icon
          name="arrow-back"
          size={26}
          style={styles.icon}
          onPress={goBack}
        />
      )}
      <StyledText fsize={2.6} fontVariant="semiBold">
        {text ? text : `Comentarios (${commentsCount})`}
      </StyledText>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: themeColors.border,
    borderBottomWidth: 1,
  },
  icon: {
    paddingRight: 8,
  },
});

export default HeaderModalComments;

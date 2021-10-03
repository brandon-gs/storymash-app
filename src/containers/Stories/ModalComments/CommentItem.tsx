import React from 'react';
import {Box, StyledText, UserAvatar} from 'components';
import {StoryPartComment} from 'interfaces/story';
import {
  Dimensions,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {themeColors} from 'theme/theme';
import _ from 'lodash';

interface CommentProps {
  isAuthor: boolean;
  openModalMenuComment: (commentIdx: number) => void;
  handleDeleteComment: () => void;
}

const {width} = Dimensions.get('window');

const Comment = ({
  item,
  index,
  isAuthor,
  openModalMenuComment,
}: ListRenderItemInfo<StoryPartComment> & CommentProps) => {
  return (
    <Box direction="row" alignItems="center" px={1} py={1}>
      <Box mr={1} justifyContent="center">
        <UserAvatar userImage={item.author.image} size={48} />
      </Box>
      <Box direction="column" style={styles.commentContent}>
        <Box direction="row" alignItems="center">
          <StyledText fsize={2} fontVariant="semiBold" color="gray">
            {`${item.author.username} · `}
          </StyledText>
          <StyledText fsize={2} color="gray">
            Hace un momento
          </StyledText>
        </Box>
        <StyledText fsize={2.5}>{item.content}</StyledText>
      </Box>

      {isAuthor && (
        <TouchableOpacity
          onPress={() => openModalMenuComment(index)}
          style={styles.optionsButtonIcon}>
          <Box pr={1}>
            <Icon
              name="ellipsis-vertical"
              size={24}
              color={themeColors.disabledIcon}
            />
          </Box>
        </TouchableOpacity>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  commentContent: {
    flexGrow: 1,
    width: width - 96,
  },
  optionsButtonIcon: {
    position: 'absolute',
    top: 8,
    right: 0,
  },
});

export default React.memo(Comment, (prev, next) => {
  return _.isEqual(prev, next);
});

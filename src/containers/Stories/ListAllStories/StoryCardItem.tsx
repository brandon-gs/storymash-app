import React from 'react';
import _ from 'lodash';
import {TouchableOpacity, ListRenderItemInfo, StyleSheet} from 'react-native';
import {Box, StyledText} from 'components';
import {LikeButton} from 'components';
import {Chip} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import CoverStory from '../CoverStory';
import {Story} from 'interfaces/story';
import {User} from 'interfaces/user';
import {themeColors} from 'theme/theme';

const ICON_SIZE = 24;

interface StorystoryProps extends ListRenderItemInfo<Story> {
  user: User;
  liked: boolean;
  onPress: (story: Story) => void;
  onPressLike: (story: Story) => Promise<void>;
}

const StoryItem = ({
  item,
  user,
  liked,
  index,
  onPress,
  onPressLike,
}: StorystoryProps) => {
  const margin = index === 0 ? 2 : 1;
  const isAuthor = user._id === item.author._id;

  return (
    <Box bg="white" mt={margin} mb={1} style={styles.container}>
      <TouchableOpacity
        delayPressIn={50}
        onPress={() => onPress(item)}
        style={styles.container}>
        <Box width="100%">
          <CoverStory story={item} showChip />
          <Box width="100%" mt={3} px={2}>
            <StyledText fontVariant="black" fsize={3}>
              {item.title}
            </StyledText>
          </Box>
          <Box width="100%" mt={1} px={2}>
            <StyledText fsize={2.5}>{item.parts[0].content}</StyledText>
          </Box>
          <Box
            width="100%"
            mt={2}
            px={2}
            direction="row"
            justifyContent="space-between">
            <Box direction="row">
              {item.category.map(category => (
                <Chip
                  key={`story-${item._id}-chip-${category}`}
                  title={`# ${category}`}
                  containerStyle={styles.chip}
                  onPress={() => onPress(item)}
                />
              ))}
            </Box>
            <Box alignItems="center" justifyContent="flex-end" direction="row">
              <Icon
                style={styles.footerIcon}
                name="documents-outline"
                size={ICON_SIZE}
              />
              <StyledText fsize={2.1}>{`${item.totalParts} ${getPlural(
                'parte',
                item.totalParts,
              )}`}</StyledText>
            </Box>
          </Box>
        </Box>
      </TouchableOpacity>
      {/* Divider */}
      <Box mt={2} width="100%" height={1} bgTheme="greyOutline" />
      {/* Icons section */}
      <Box direction="row" justifyContent="space-between">
        <Box
          alignItems="center"
          direction="row"
          justifyContent="center"
          py={1.5}
          width="33%">
          <Icon style={styles.footerIcon} name="eye" size={ICON_SIZE} />
          <StyledText fsize={2.1}>{item.views.length} vistas</StyledText>
        </Box>
        <Box
          alignItems="center"
          justifyContent="center"
          direction="row"
          py={1.5}
          width="33%">
          <Icon
            style={styles.footerIcon}
            name="chatbubbles-outline"
            size={ICON_SIZE}
          />
          <StyledText fsize={2.1}>
            {`${item.totalComments} ${getPlural(
              'comentario',
              item.totalComments,
            )}`}
          </StyledText>
        </Box>
        <TouchableOpacity
          style={styles.buttonLike}
          onPress={async () => await onPressLike(item)}
          disabled={isAuthor}>
          <Box
            alignItems="center"
            justifyContent="center"
            direction="row"
            py={1.5}
            width="100%">
            <LikeButton isAuthor={isAuthor} liked={liked} size={ICON_SIZE} />
            <StyledText fsize={2.1}>
              {`${item.totalLikes} ${getPlural('like', item.totalLikes)}`}
            </StyledText>
          </Box>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

function getPlural(word: string, quantity: number) {
  if (quantity === 1) {
    return word;
  }
  return word + 's';
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
  },
  chip: {
    marginRight: 16,
  },
  footerIcon: {
    paddingRight: 4,
    color: themeColors.disabledIcon,
  },
  buttonLike: {
    width: '33%',
  },
});

export default React.memo(StoryItem, (prev, next) => {
  return _.isEqual(prev, next);
});

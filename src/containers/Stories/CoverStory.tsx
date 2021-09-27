import React from 'react';
import {Story} from 'interfaces/story';
import {Chip, Image} from 'react-native-elements';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import {themeColors} from 'theme/theme';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
import {StyledText, UserAvatar} from 'components';
import Icon from 'react-native-vector-icons/Ionicons';

interface CoverStoryProps {
  story: Story;
  fontSize?: number;
  showChip?: boolean;
  canGoBack?: boolean;
  isLastPart?: boolean;
  onPressGoBack?: () => void;
  onPressNextPart?: () => void;
}

export const COVER_SIZE = 144;

export default function CoverStory({
  story,
  fontSize = 2.5,
  showChip = false,
  isLastPart = true,
  canGoBack = false,
  onPressGoBack = () => console.log('Change onPressGoBack prop'),
  onPressNextPart = () => console.log('Change onPressNextPart prop'),
}: CoverStoryProps) {
  const isNew = story.totalParts <= 1;

  return (
    <>
      {/* Cover image */}
      <Image
        source={{
          uri: story.image,
        }}
        style={styles.coverImage}
        PlaceholderContent={
          <ActivityIndicator size="large" color={themeColors.primary} />
        }
      />
      <Svg height={COVER_SIZE} width="100%" style={styles.gradientContainer}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="black" stopOpacity="0.2" />
            <Stop offset="0.95" stopColor="black" stopOpacity="0.8" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
      </Svg>
      {/* Button to go back */}
      {canGoBack && (
        <Icon
          name="chevron-back-outline"
          size={40}
          color="white"
          style={styles.iconBack}
          onPress={onPressGoBack}
        />
      )}
      {showChip && (
        <Chip
          title={isNew ? 'Nueva historia' : 'Nueva parte'}
          containerStyle={styles.chipContainer}
          buttonStyle={[
            styles.chipButton,
            {
              backgroundColor: isNew
                ? themeColors.primaryLight
                : themeColors.secondary,
            },
          ]}
          titleStyle={styles.chipTitle}
        />
      )}
      {/* User info */}
      <UserAvatar
        rounded
        size="medium"
        userImage={story.author.image}
        containerStyle={styles.avatarImage}
      />
      <StyledText
        style={styles.authorName}
        color="white"
        fontVariant="bold"
        fontSize={fontSize}>
        {story.author.username}
      </StyledText>
      {/* Button to go to the next part */}
      {!isLastPart && (
        <TouchableOpacity onPress={onPressNextPart} style={styles.goNextPart}>
          <Icon name="arrow-forward-outline" size={32} color="white" />
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  iconBack: {
    position: 'absolute',
    top: 8,
  },
  goNextPart: {
    position: 'absolute',
    right: 0,
    top: COVER_SIZE - 40,
    paddingRight: 8,
  },
  chipContainer: {
    position: 'absolute',
    top: COVER_SIZE - 40,
    right: 0,
  },
  chipButton: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  chipTitle: {
    fontSize: 18,
  },
  coverImage: {
    resizeMode: 'cover',
    width: '100%',
    height: COVER_SIZE,
  },
  authorName: {
    position: 'absolute',
    left: 48 + 16,
    top: COVER_SIZE - 40,
  },
  gradientContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  avatarImage: {
    position: 'absolute',
    top: COVER_SIZE - 72 / 2,
    left: 8,
    zIndex: 100,
  },
});

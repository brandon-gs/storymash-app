import React, {useCallback} from 'react';
import _ from 'lodash';
import {StyledText, Box, ListStoryParts} from 'components';
import {Story} from 'interfaces/story';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import CoverStory, {COVER_SIZE} from './CoverStory';
import Icon from 'react-native-vector-icons/Ionicons';
import {ButtonLike} from 'components';
import useLikeButton from 'hooks/useButtonLike';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme} from 'react-native-elements';
import {useNavigation} from '@react-navigation/core';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import actions from 'store/actions';
import {
  AuthStackRoutes,
  ProfileScreenProp,
} from 'navigation/AuthStackNavigation';

export interface ReadStoryProps {
  story: Story;
  storyPartIndex: number;
}

const {height} = Dimensions.get('window');

function ReadStory({story, storyPartIndex}: ReadStoryProps) {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.authentication);
  const {theme} = useTheme();
  const navigation = useNavigation<ProfileScreenProp>();

  const {addOrRemoveLike} = useLikeButton();

  const isAuthor = story.author._id === user?._id;
  const liked = story.parts[storyPartIndex].likes.includes(user?._id || '');
  const isLastPart =
    storyPartIndex === story.totalParts - 1 || story.totalParts < 2;

  const part = story.parts[storyPartIndex];

  const goToProfile = useCallback(() => {
    navigation.navigate(AuthStackRoutes.Profile, {
      profileUsername: story.author.username,
    });
  }, [navigation, story.author.username]);

  return (
    <Box bg="white">
      <CoverStory
        story={story}
        fontSize={3}
        canGoBack={navigation.canGoBack()}
        isLastPart={isLastPart}
        goToProfile={goToProfile}
        onPressGoBack={() => {
          navigation.goBack();
        }}
        onPressNextPart={() => {
          if (!isLastPart) {
            dispatch(actions.story.updateCurrentPartIndex(storyPartIndex + 1));
          }
        }}
      />
      {/* Story title, content and like section */}
      <Box pt={1} pb={2} style={styles.storyContent}>
        {/* Story title */}
        <Box px={2} my={1}>
          <StyledText
            fontVariant="black"
            fsize={calculateFontSize(story.title)}
            align="right">
            {story.title}
          </StyledText>
        </Box>

        {/* Story parts navigation */}
        <Box>
          <ListStoryParts
            totalParts={story.totalParts}
            textProps={{
              fontSize: 2,
            }}
            buttonGroupProps={{
              onPress: index => {
                dispatch(actions.story.updateCurrentPartIndex(index));
              },
              selectedIndex: storyPartIndex,
              innerBorderStyle: {
                width: 0,
              },
              buttonContainerStyle: styles.buttonContainerStyle,
              containerStyle: styles.containerStyle,
              selectedButtonStyle: {
                ...styles.selectedButtonStyle,
                borderBottomColor: theme.colors?.primary,
              },
            }}
          />
        </Box>

        {/* Story part content */}
        <Box px={2} mb={2}>
          <StyledText fontVariant="regular" fsize={2.7}>
            {`${part.content}`}
          </StyledText>
        </Box>

        {/* Grow content */}
        <View style={styles.grow} />

        {/* Statistics */}
        <Box px={2} direction="row">
          <TouchableOpacity
            onPress={async () => await addOrRemoveLike(story, storyPartIndex)}
            disabled={isAuthor}>
            <Box direction="row" pr={2}>
              <ButtonLike isAuthor={isAuthor} liked={liked} />
              <StyledText>{part.likes.length}</StyledText>
            </Box>
          </TouchableOpacity>
          <Box direction="row">
            <Icon name="chatbubbles-outline" size={32} />
            <StyledText>{part.comments.length}</StyledText>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  storyContent: {
    minHeight: height - COVER_SIZE - 40 - getStatusBarHeight(),
  },
  grow: {
    flex: 1,
    flexGrow: 1,
  },
  buttonContainerStyle: {
    backgroundColor: 'white',
    padding: 0,
  },
  containerStyle: {
    width: 480,
    borderWidth: 0,
    padding: 0,
  },
  selectedButtonStyle: {
    backgroundColor: 'white',
    borderBottomWidth: 2,
    padding: 0,
  },
});

function calculateFontSize(title: string) {
  const fSize = 4 - Math.round(title.length / 21);
  return fSize >= 3 ? fSize : 4;
}

export default React.memo(ReadStory, (prev, next) => {
  return _.isEqual(prev, next);
});

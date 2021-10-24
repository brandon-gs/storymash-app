import React from 'react';
import _ from 'lodash';
import {Box, ButtonFollow, StyledText, UserAvatar} from 'components';
import {User} from 'interfaces/user';
import {
  Dimensions,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface SearchProfileItem extends ListRenderItemInfo<User> {
  isFollowingLoading: boolean;
  isOwnProfile: boolean;
  isFollower: boolean;
  goToProfile: (username: string) => () => void;
  handleFollowPress: (
    username: string,
    userId: string,
    isFollower: boolean,
  ) => Promise<void>;
}

const {width} = Dimensions.get('window');

function SearchProfileItem({
  isFollowingLoading,
  item,
  isOwnProfile,
  isFollower,
  handleFollowPress,
  goToProfile,
}: SearchProfileItem) {
  return (
    <Box direction="row" width="100%" mb={1}>
      <TouchableOpacity onPress={goToProfile(item.username)}>
        <Box
          direction="row"
          width={width}
          height="100%"
          bg="white"
          alignItems="center"
          pl={2}
          pt={2}
          pb={1}>
          <Box mr={1}>
            <UserAvatar userImage={item.image} size="medium" />
          </Box>
          <Box>
            <StyledText fsize={2.5}>{formatUsername(item.username)}</StyledText>
            <StyledText
              fsize={2}
              color="gray">{`Seguidores ${item.followers.length}`}</StyledText>
          </Box>
          <Box style={styles.grow} />
          <ButtonFollow
            isLoading={isFollowingLoading}
            isFollower={isFollower}
            handlePress={async () =>
              await handleFollowPress(item.username, item._id, isFollower)
            }
            isOwnProfile={isOwnProfile}
            buttonStyle={styles.buttonFollow}
          />
        </Box>
      </TouchableOpacity>
    </Box>
  );
}

const styles = StyleSheet.create({
  grow: {
    flex: 1,
    flexGrow: 1,
  },
  buttonFollow: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});

function formatUsername(username: string) {
  if (username.length > 20) {
    return `${username.substring(0, 20)}...`;
  }
  return username;
}

export default React.memo(SearchProfileItem, (prev, next) => {
  return _.isEqual(prev, next);
});

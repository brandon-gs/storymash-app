import React from 'react';
import {Box, StyledText, UserAvatar, ButtonFollow} from 'components';
import {ButtonSettings} from 'containers';
import Icon from 'react-native-vector-icons/Ionicons';
import {useButtonFollow} from 'hooks';
import _ from 'lodash';
import {useSelector} from 'react-redux';
import selectors from 'selectors';

interface InfoProfileProps {}

function InfoProfile({}: InfoProfileProps) {
  const profile = useSelector(state => state.profile.user);
  const followLoading = useSelector(selectors.profile.getFollowLoading);

  const {isOwnProfile, isUserFollowing, handlePress} = useButtonFollow(profile);

  if (profile) {
    return (
      <Box bg="white">
        <Box direction="row" justifyContent="space-between" px={3} pt={2}>
          <ButtonFollow
            isLoading={followLoading}
            isFollower={isUserFollowing}
            isOwnProfile={isOwnProfile}
            handlePress={handlePress}
          />
          <Box alignItems="center" height={104} justifyContent="space-between">
            <UserAvatar userImage={profile.image} size={80} />
            <StyledText color="primary">@{profile.username}</StyledText>
          </Box>
          <ButtonSettings />
        </Box>
        <Box direction="row" justifyContent="center" alignItems="center" mt={2}>
          <StyledText fsize={2} color="grey">
            {`Nivel ${profile.level} (${profile.points} puntos) `}
          </StyledText>
          <Icon
            name="ellipse"
            size={16}
            color={getColorFromLevel(profile.level)}
          />
        </Box>
        {profile.about !== '' && (
          <Box alignItems="center" px={1} my={2}>
            <StyledText fsize={2.5} color="grey" align="center">
              {profile.about}
            </StyledText>
          </Box>
        )}
        <Box direction="row" justifyContent="center" my={2}>
          <StyledText fsize={2} color="grey">
            {`Seguidores (${profile.followers.length})  |  Seguidos (${profile.following.length})`}
          </StyledText>
        </Box>
      </Box>
    );
  }
  return null;
}

export function getColorFromLevel(level: number): string {
  const colors = [
    '#ffb7c5',
    '#ff8fa7',
    '#eeaba2',
    '#080505',
    '#b5c6da',
    '#8ea7c6',
    '#7ac4e1',
    '#fff292',
    '#ffec5f',
    '#cee883',
    '#b4dd41',
    '#f781a4',
  ];
  return colors[level];
}

export default React.memo(InfoProfile, (prev, next) => {
  return _.isEqual(prev, next);
});

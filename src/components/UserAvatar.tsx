import React from 'react';
import {Avatar, AvatarProps} from 'react-native-elements';

interface UserAvatarProps extends AvatarProps {
  userImage: string;
}

export default function UserAvatar({userImage, ...props}: UserAvatarProps) {
  return <Avatar rounded source={{uri: userImage}} {...props} />;
}

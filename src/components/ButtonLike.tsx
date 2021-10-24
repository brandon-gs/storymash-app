import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {IconProps} from 'react-native-vector-icons/Icon';
import {themeColors} from 'theme/theme';

interface ButtonLikeProps extends Omit<IconProps, 'name'> {
  isAuthor: boolean;
  liked: boolean;
}

export default function ButtonLike({
  isAuthor,
  liked,
  size = 32,
  ...props
}: ButtonLikeProps) {
  const color = isAuthor ? themeColors.disabledIcon : themeColors.pink.light;
  const name = liked || isAuthor ? 'heart' : 'heart-outline';
  return <Icon {...props} color={color} name={name} size={size} />;
}

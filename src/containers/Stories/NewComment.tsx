import React, {useState} from 'react';
import {Box, UserAvatar} from 'components';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Input, useTheme} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

const NewComment = () => {
  const user = useSelector(state => state.authentication.user);
  const {theme} = useTheme();

  const [comment, setComment] = useState<string>('');

  const handleSubmitComment = async () => {
    setComment('');
  };

  if (!user) {
    return null;
  }

  return (
    <Box direction="row">
      <UserAvatar userImage={user.image} size="medium" />
      <Input
        placeholder="Comentario"
        multiline
        value={comment}
        onChangeText={value => setComment(value)}
        inputContainerStyle={styles.inputContainer}
        rightIconContainerStyle={styles.rightIconContainerStyle}
        rightIcon={
          comment ? (
            <TouchableOpacity
              style={styles.rightIconButton}
              onPress={handleSubmitComment}>
              <Icon name="send" size={24} color={theme.colors?.primary} />
            </TouchableOpacity>
          ) : undefined
        }
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    width: '88%',
    alignItems: 'flex-end',
    top: -12,
  },
  rightIconContainerStyle: {
    width: 40,
    alignItems: 'flex-end',
  },
  rightIconButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
});

export default NewComment;

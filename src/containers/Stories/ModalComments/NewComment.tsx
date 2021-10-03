import React, {useState} from 'react';
import {Box, Loader} from 'components';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Input, useTheme} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {Keyboard} from 'react-native';
import {useSelector} from 'react-redux';
import {useThunkDispatch} from 'hooks';
import actions from 'store/actions';

const NewComment = () => {
  const dispatch = useThunkDispatch();
  const story = useSelector(state => state.story);
  const {theme} = useTheme();

  const [loading, setLoading] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');

  const handleLoader = (newState: boolean) => setLoading(newState);

  const handleSubmitComment = async () => {
    if (story) {
      handleLoader(true);
      await dispatch(
        actions.story.addComment(story._id, story.currentPart, comment),
      );
      setComment('');
      Keyboard.dismiss();
      handleLoader(false);
    }
  };

  return (
    <>
      <Box direction="row" style={styles.inputBox} bg="#fafafa">
        <Input
          placeholder="Escribe un comentario..."
          multiline
          value={comment}
          onChangeText={value => setComment(value)}
          containerStyle={styles.inputRootContainer}
          inputContainerStyle={styles.inputContainer}
          rightIconContainerStyle={styles.rightIconContainerStyle}
          rightIcon={
            loading ? (
              <Loader size={24} />
            ) : comment ? (
              <TouchableOpacity
                style={styles.rightIconButton}
                onPress={handleSubmitComment}>
                <Icon name="send" size={24} color={theme.colors?.primary} />
              </TouchableOpacity>
            ) : undefined
          }
        />
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: '#fafafa',
    maxHeight: 72,
    borderTopColor: 'gray',
    borderTopWidth: 1,
  },
  inputRootContainer: {
    height: 56,
    marginBottom: 8,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'flex-end',
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

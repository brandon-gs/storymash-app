import React, {useState} from 'react';
import {Box, Loader, UserAvatar} from 'components';
import {useSelector} from 'react-redux';
import {Input, useTheme} from 'react-native-elements';
import {Keyboard, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {StoryPartComment} from 'interfaces/story';
import {useThunkDispatch} from 'hooks';
import actions from 'store/actions';

interface ModalEditCommentProps {
  comment: StoryPartComment;
  commentIndex: number;
  goBack: () => void;
}

const ModalEditComment = ({
  comment: commentProp,
  commentIndex,
  goBack,
}: ModalEditCommentProps) => {
  const dispatch = useThunkDispatch();
  const story = useSelector(state => state.story);
  const user = useSelector(state => state.authentication.user);
  const {theme} = useTheme();

  const [comment, setComment] = useState<string>(commentProp.content || '');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLoading = (newLoading: boolean) => setLoading(newLoading);

  const handleSubmitComment = async () => {
    handleLoading(true);
    await dispatch(
      actions.story.editComment(
        story!._id,
        story!.currentPart,
        commentIndex,
        comment,
      ),
    );
    Keyboard.dismiss();
    handleLoading(false);
    goBack();
  };

  return (
    <Box px={1} py={1} direction="row">
      <Box pt={1}>
        <UserAvatar userImage={user!.image} size="medium" />
      </Box>
      <Box width="84%">
        <Input
          placeholder="Edita tu comentario..."
          autoFocus
          multiline
          value={comment}
          onChangeText={value => setComment(value)}
          containerStyle={styles.inputRootContainer}
          inputContainerStyle={styles.inputContainer}
          rightIconContainerStyle={styles.rightIconContainerStyle}
          onSubmitEditing={handleSubmitComment}
          inputStyle={styles.inputStyle}
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
    </Box>
  );
};

const styles = StyleSheet.create({
  inputRootContainer: {
    height: 'auto',
    marginBottom: 16,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  inputStyle: {
    paddingVertical: 0,
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

export default ModalEditComment;

import React from 'react';
import {Box, StyledText} from 'components';
import {Button, ButtonProps, Overlay} from 'react-native-elements';
import {StyleSheet} from 'react-native';

export interface ModalDeleteCommentProps {
  isVisible: boolean;
  onCancel: () => void;
  onDelete: () => void | Promise<void>;
  buttonDeleteProps?: ButtonProps;
}

const ModalDeleteComment = ({
  isVisible,
  onCancel,
  onDelete,
  buttonDeleteProps,
}: ModalDeleteCommentProps) => {
  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={styles.modalDeleteComment}
      onBackdropPress={onCancel}>
      <Box py={2} px={1}>
        <StyledText align="center">
          ¿Estás seguro de que deseas eliminar tu comentario?
        </StyledText>
        <Box direction="row" justifyContent="center" mb={1} mt={2}>
          <Box mr={3} width={96}>
            <Button
              title="Cancelar"
              type="clear"
              titleStyle={styles.buttonTitle}
              onPress={onCancel}
            />
          </Box>
          <Box width={96}>
            <Button
              title="Eliminar"
              titleStyle={styles.buttonTitle}
              onPress={async () => await onDelete()}
              {...buttonDeleteProps}
            />
          </Box>
        </Box>
      </Box>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  modalDeleteComment: {
    width: '80%',
    maxWidth: 320,
  },
  buttonTitle: {
    fontSize: 18,
  },
});

export default ModalDeleteComment;

import {Box, Loader, ModalMenuItem, StyledText} from 'components';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {StoryPartComment} from 'interfaces/story';
import {
  Animated,
  FlatListProps,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import Comment from './CommentItem';
import {Portal} from 'react-native-portalize';
import NewComment from './NewComment';
import HeaderModalComments from './HeaderModalComments';
import ModalDeleteComment from './ModalDeleteComment';
import _ from 'lodash';
import {useThunkDispatch} from 'hooks';
import actions from 'store/actions';
import EmptyComments from './EmptyComments';
import ModalEditComment from './ModalEditComment';

interface ModalCommentsProps {
  userId: string;
  storyId: string;
  partIndex: number;
  comments: StoryPartComment[];
}

const ModalComments = ({
  storyId,
  partIndex = 0,
  comments = [],
  userId,
}: ModalCommentsProps) => {
  // TODO: refactor this hook in:
  // [ref, open, close] = useModalize()
  // [isVisible, open, close] = useModal()
  // [flatListProps] = useComments
  const {
    modalizeRef,
    modalizeRefMenuComment,
    modalizeRefEditComment,
    flatListProps,
    deleteButtonLoading,
    deleteCommentModal,
    onOpen, // open modal comments
    openDeleteModal,
    closeEditModal,
    closeDeleteModal,
    closeMenuModal,
    handleDeleteComment,
    openEditModal,
    commentIdx,
  } = useModalComments({
    storyId,
    comments,
    partIndex,
    userId,
  });

  return (
    <>
      <Box style={styles.container}>
        <TouchableOpacity onPress={onOpen}>
          <Box width="100%" height={64} bg="#fafafa" px={2} py={2}>
            <StyledText fontVariant="bold" fsize={2.5}>
              {`Comentarios (${comments.length})`}
            </StyledText>
          </Box>
        </TouchableOpacity>
      </Box>
      {/* Modal list Comments */}
      <Portal>
        <Modalize
          ref={modalizeRef}
          modalStyle={styles.modalStyle}
          HeaderComponent={
            <HeaderModalComments commentsCount={comments.length} />
          }
          flatListProps={flatListProps}
          FooterComponent={<NewComment />}
        />

        {/* Comment menu */}
        <Modalize ref={modalizeRefMenuComment} adjustToContentHeight>
          <Box>
            <ModalMenuItem
              title="Editar comentario"
              iconProps={{
                name: 'create-outline',
              }}
              buttonProps={{
                onPress: openEditModal,
              }}
            />
            <ModalMenuItem
              title="Eliminar comentario"
              iconProps={{
                name: 'trash-outline',
              }}
              buttonProps={{
                onPress: openDeleteModal,
              }}
            />
            {/* Modal to delete a comment */}
            <ModalDeleteComment
              isVisible={deleteCommentModal}
              onCancel={closeDeleteModal}
              onDelete={handleDeleteComment}
              buttonDeleteProps={{
                loading: deleteButtonLoading,
              }}
            />
          </Box>
        </Modalize>
        {/* Modal to edit a comment */}
        <Modalize
          ref={modalizeRefEditComment}
          modalStyle={styles.modalStyle}
          overlayStyle={styles.transparent}
          scrollViewProps={{
            keyboardShouldPersistTaps: 'always',
            keyboardDismissMode: 'on-drag',
          }}
          HeaderComponent={
            <HeaderModalComments
              text="Editar comentario"
              goBack={closeEditModal}
            />
          }>
          <ModalEditComment
            comment={comments[commentIdx]}
            commentIndex={commentIdx}
            goBack={() => {
              closeEditModal();
              closeMenuModal();
            }}
          />
        </Modalize>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopColor: '#000',
    borderWidth: 0.2,
  },
  modalStyle: {
    flex: 1,
    marginTop: 40,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  commentOptionsModal: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 0,
  },
});

interface UseModalCommentsParams {
  storyId: string;
  partIndex: number;
  userId: string;
  comments: StoryPartComment[];
}

const useModalComments = ({
  storyId,
  partIndex,
  userId,
  comments,
}: UseModalCommentsParams) => {
  const dispatch = useThunkDispatch();

  const modalizeRef = useRef<Modalize>(null);
  const modalizeRefMenuComment = useRef<Modalize>(null);
  const modalizeRefEditComment = useRef<Modalize>(null);

  const [commentIdx, setCommentIdx] = useState<number>(-1);
  const [deleteButtonLoading, setDeleteButtonLoading] =
    useState<boolean>(false);
  const [showCommentsLoader, setShowCommentsLoader] = useState<boolean>(true);

  const [deleteCommentModal, setDeleteCommentModal] = useState<boolean>(false);

  const handleDeleteButtonLoading = useCallback(
    (newValue: boolean) => setDeleteButtonLoading(newValue),
    [],
  );

  const openDeleteModal = useCallback(() => setDeleteCommentModal(true), []);
  const closeDeleteModal = useCallback(() => setDeleteCommentModal(false), []);

  const openModalMenuComment = useCallback((currentCommentIdx: number) => {
    setCommentIdx(currentCommentIdx);
    if (modalizeRefMenuComment.current) {
      modalizeRefMenuComment.current.open();
    }
  }, []);

  const openEditModal = useCallback(() => {
    if (modalizeRefEditComment.current) {
      modalizeRefEditComment.current.open('top');
    }
  }, []);

  const closeEditModal = useCallback(() => {
    if (modalizeRefEditComment.current) {
      modalizeRefEditComment.current.close('default');
    }
  }, []);

  const closeMenuModal = useCallback(() => {
    if (modalizeRefMenuComment.current) {
      modalizeRefMenuComment.current.close();
    }
  }, []);

  const handleDeleteComment = useCallback(async () => {
    handleDeleteButtonLoading(true);
    await dispatch(actions.story.removeComment(storyId, partIndex, commentIdx));
    handleDeleteButtonLoading(false);
    closeDeleteModal();
    if (modalizeRefMenuComment.current) {
      modalizeRefMenuComment.current.close();
    }
  }, [
    dispatch,
    commentIdx,
    partIndex,
    storyId,
    closeDeleteModal,
    handleDeleteButtonLoading,
  ]);

  const onOpen = useCallback(() => {
    modalizeRef.current?.open('top');
    setShowCommentsLoader(true);
  }, []);

  const renderItem = useCallback(
    (props: ListRenderItemInfo<StoryPartComment>) => {
      const isAuthor = userId === props.item.author._id;
      return (
        <Comment
          isAuthor={isAuthor}
          openModalMenuComment={openModalMenuComment}
          handleDeleteComment={closeDeleteModal}
          {...props}
        />
      );
    },
    [openModalMenuComment, closeDeleteModal, userId],
  );

  const flatListProps: Animated.AnimatedProps<FlatListProps<StoryPartComment>> =
    useMemo(() => {
      return {
        data: comments,
        initialNumToRender: 0,
        onEndReachedThreshold: 160,
        renderItem,
        keyExtractor: (item: any, index: number) => `comment-${index}`,
        ListFooterComponent:
          showCommentsLoader && comments.length > 0 ? (
            <Loader bg="#fff" />
          ) : (
            <StyledText fsize={0} />
          ),
        ListEmptyComponent: EmptyComments,
        onEndReached: () => setShowCommentsLoader(false),
        showsVerticalScrollIndicator: false,
      };
    }, [comments, renderItem, showCommentsLoader]);

  return {
    commentIdx,
    modalizeRef,
    modalizeRefMenuComment,
    modalizeRefEditComment,
    deleteButtonLoading,
    flatListProps,
    deleteCommentModal,
    openEditModal,
    closeEditModal,
    onOpen,
    handleDeleteComment,
    openDeleteModal,
    closeDeleteModal,
    closeMenuModal,
  };
};

export default React.memo(ModalComments, (prev, next) => {
  return _.isEqual(prev, next);
});

import {Box, StyledText} from 'components';
import React from 'react';
import NewComment from './NewComment';

interface CommentsProps {
  commentsCount: number;
}

const Comments = ({commentsCount = 0}: CommentsProps) => {
  return (
    <Box>
      <Box width="100%" bg="#fafafa" height={64} px={2} py={2}>
        <StyledText fontVariant="bold" fsize={2.5}>
          {`Comentarios (${commentsCount})`}
        </StyledText>
      </Box>
      <Box bg="white" py={2} px={1}>
        <NewComment />
      </Box>
    </Box>
  );
};

export default Comments;

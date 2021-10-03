import React from 'react';
import {Box, StyledText} from 'components';

interface HeaderModalCommentsProps {
  commentsCount: number;
}

const HeaderModalComments = ({commentsCount = 0}: HeaderModalCommentsProps) => {
  return (
    <Box px={1} py={1}>
      <StyledText
        fsize={2.5}
        fontVariant="semiBold">{`Comentarios (${commentsCount})`}</StyledText>
    </Box>
  );
};

export default HeaderModalComments;

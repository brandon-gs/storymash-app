import React from 'react';
import {Box, StyledText} from 'components';
import Icon from 'react-native-vector-icons/Ionicons';

const EmptyComments = () => {
  return (
    <Box px={2} py={4} justifyContent="center" alignItems="center">
      <Box mb={1}>
        <Icon name="chatbubbles" size={120} color="gray" />
      </Box>
      <StyledText color="gray" fsize={2.4}>
        Aún no hay comentarios
      </StyledText>
      <StyledText color="gray" fsize={2}>
        Se el primero en comentar.
      </StyledText>
    </Box>
  );
};

export default EmptyComments;

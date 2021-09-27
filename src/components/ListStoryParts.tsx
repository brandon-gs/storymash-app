import React, {useEffect, useRef, useState} from 'react';
import {Box, StyledText} from 'components';
import {ScrollView} from 'react-native';
import {ButtonGroup, ButtonGroupProps} from 'react-native-elements';
import {BoxProps} from './Box';
import {StyledTextProps} from './StyledText';

interface ListStoryPartsProps {
  totalParts: number;
  boxProps?: BoxProps;
  buttonGroupProps: Omit<ButtonGroupProps, 'buttons'>;
  textProps?: StyledTextProps;
}

const ITEM_WIDTH = 240;

const ListStoryParts: React.FC<ListStoryPartsProps> = ({
  totalParts,
  boxProps = {},
  buttonGroupProps,
  textProps = {},
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const selectedIndex = buttonGroupProps.selectedIndex
    ? buttonGroupProps.selectedIndex
    : 0;

  const [parts, setParts] = useState<React.ReactElement<{}>[]>(
    createArray(totalParts, selectedIndex, textProps),
  );

  useEffect(() => {
    setParts(createArray(totalParts, selectedIndex, textProps));
  }, [textProps, selectedIndex, totalParts]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: (ITEM_WIDTH - 168) * Math.round(selectedIndex / 3),
        y: 0,
        animated: true,
      });
    }
  }, [selectedIndex]);

  if (totalParts < 2) {
    return null;
  }

  return (
    <Box width="100%" {...boxProps}>
      <ScrollView
        horizontal
        pagingEnabled
        snapToInterval={ITEM_WIDTH - 160}
        decelerationRate={0}
        snapToAlignment="center"
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}>
        <ButtonGroup buttons={parts} {...buttonGroupProps} />
      </ScrollView>
    </Box>
  );
};

function createArray(
  length: number,
  selectedIndex: number,
  props: StyledTextProps,
) {
  return Array.from({length}, (_, i) => {
    const color = selectedIndex === i ? 'primary' : 'black';
    const variant = selectedIndex === i ? 'extraBold' : 'regular';
    return (
      <StyledText color={color} fontVariant={variant} {...props}>
        {'#' + (i + 1)}
      </StyledText>
    );
  });
}

export default ListStoryParts;

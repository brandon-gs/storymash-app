import React, {useState} from 'react';
import {Box, StyledText} from 'components';
import {StyleSheet} from 'react-native';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import {fontVariants} from 'theme/fonts';
import {useTheme} from 'react-native-elements';

function FormStory() {
  const {theme} = useTheme();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>(
    'lorem lorem adadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadadaadadadadada ',
  );

  const mainColor = theme.colors?.main?.main;

  return (
    <Box px={2} py={2} alignItems="center">
      <StyledText
        fsize={3.5}
        color={theme.colors?.gray?.main}
        fontVariant="bold">
        Crear historia
      </StyledText>
      <Box width="100%" mt={2}>
        <OutlinedTextField
          autoFocus
          label="Título"
          placeholder="Escribe el título de tu historia"
          value={title}
          onChangeText={setTitle}
          tintColor={mainColor}
          labelTextStyle={styles.labelTextStyle}
          fontSize={18}
          labelFontSize={18}
        />
      </Box>
      <Box width="100%" mt={2}>
        <OutlinedTextField
          multiline
          numberOfLines={10}
          label="Contenido"
          placeholder="Escribe tu historia..."
          value={content}
          onChangeText={setContent}
          tintColor={mainColor}
          labelTextStyle={styles.labelTextStyle}
          fontSize={18}
          labelFontSize={18}
        />
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  labelTextStyle: {
    paddingTop: 5,
    fontFamily: fontVariants.regular,
    top: -4,
  },
});

export default FormStory;

import React from 'react';
// Components
import {Box, StyledText, BackgroundFull} from 'components';
import {ScrollView, Image, StatusBar, StyleSheet} from 'react-native';
import {FormLogin} from 'containers';
import {Button} from 'react-native-elements';
// Assets
import backgroundImage from 'assets/background2.jpg';
import logoImage from 'assets/images/logo.png';
// Theme
import {fontVariants} from 'theme/fonts';

const LoginScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <Box px={2} py={4} width="100%" height="100%">
        <BackgroundFull source={backgroundImage} blurRadius={2} overlay={0.5} />
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <Box alignItems="center">
          <Image source={logoImage} style={styles.imageLogo} />
        </Box>
        <Box mt={3}>
          <StyledText
            fsize={4}
            fontVariant="bold"
            colorTheme="white"
            align="center">
            Iniciar sesión
          </StyledText>
        </Box>
        <FormLogin />
        <Box mt={3}>
          <Button
            title="No recuerdo mi contraseña"
            titleStyle={styles.buttonLink}
            type="clear"
          />
        </Box>
        <Box direction="row" justifyContent="center" alignItems="center" mt={5}>
          <StyledText color="white" fsize={2.5} align="center">
            ¿No tienes cuenta?
          </StyledText>
          <Button
            title="Registrate"
            titleStyle={styles.buttonLink}
            type="clear"
          />
        </Box>
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
  },
  buttonLink: {
    color: 'white',
    textDecorationLine: 'underline',
    fontFamily: fontVariants.regular,
    fontSize: 8 * 2.5,
  },
  imageLogo: {
    width: 80,
    height: 80,
  },
});

export default LoginScreen;

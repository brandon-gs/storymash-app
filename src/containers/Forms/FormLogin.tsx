import React, {useState} from 'react';
import {Box} from 'components';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import {StyleSheet} from 'react-native';
import {fontVariants} from 'theme/fonts';
import actions from 'store/actions';
import {useThunkDispatch} from 'hooks';
import useAsync from 'hooks/useAsync';
import {themeColors} from 'theme/theme';

const FormLogin = () => {
  const dispatch = useThunkDispatch();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const {loading, handlePromise} = useAsync(async () => {
    await dispatch(actions.auth.authenticate({username, password}, 'login'));
  });

  return (
    <Box mt={3}>
      <Box mt={1}>
        <Input
          inputStyle={styles.inputStyle}
          placeholder="Nombre de usuario o email"
          inputContainerStyle={styles.inputContainer}
          onChangeText={value => setUsername(value)}
          rightIcon={
            <Icon
              name="user"
              size={24}
              color={themeColors.disabledIcon}
              style={styles.inputRightIcon}
            />
          }
        />
      </Box>
      <Box mt={1}>
        <Input
          placeholder="Contraseña"
          inputStyle={styles.inputStyle}
          secureTextEntry={!showPassword}
          inputContainerStyle={styles.inputContainer}
          onChangeText={value => setPassword(value)}
          rightIcon={
            <Icon
              name={showPassword ? 'eye' : 'eye-off'}
              size={24}
              color={themeColors.disabledIcon}
              onPress={() => setShowPassword(prev => !prev)}
              style={styles.inputRightIcon}
            />
          }
          onSubmitEditing={handlePromise}
        />
      </Box>
      <Box mt={4} mb={2}>
        <Button
          title="Iniciar sesión"
          onPress={handlePromise}
          loading={loading}
          titleStyle={styles.buttonTitle}
          loadingProps={{
            size: 30,
          }}
        />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    color: themeColors.disabledIcon,
  },
  inputContainer: {
    borderRadius: 40,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderWidth: 0,
  },
  buttonTitle: {
    fontSize: 20,
    paddingVertical: 4,
    fontFamily: fontVariants.regular,
  },
  inputRightIcon: {
    paddingLeft: 8,
  },
});

export default FormLogin;

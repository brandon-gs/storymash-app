import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from 'screens';

export enum NoAuthRoutes {
  Login = 'Login',
}

export type NoAuthRoutesParams = {
  [NoAuthRoutes.Login]: undefined;
};

const Stack = createNativeStackNavigator<NoAuthRoutesParams>();

const NoAuthStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={NoAuthRoutes.Login}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={NoAuthRoutes.Login} component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default NoAuthStackNavigation;

import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {ReadStoryScreen} from 'screens';
import AuthTabsNavigation from './AuthTabsNavigation';

const Stack = createNativeStackNavigator<AuthStackParams>();

const AuthStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={AuthStackRoutes.Tabs}
        component={AuthTabsNavigation}
      />
      <Stack.Screen
        name={AuthStackRoutes.ReadStory}
        component={ReadStoryScreen}
      />
    </Stack.Navigator>
  );
};

export enum AuthStackRoutes {
  Tabs = 'Tabs',
  ReadStory = 'ReadStory',
}

export type AuthStackParams = {
  [AuthStackRoutes.Tabs]: undefined;
  [AuthStackRoutes.ReadStory]: {
    storyId: string;
  };
};

// Type to pass when use useNavigation hook
export type ReadStoryScreenProp = NativeStackNavigationProp<
  AuthStackParams,
  AuthStackRoutes.ReadStory
>;

export default AuthStackNavigation;

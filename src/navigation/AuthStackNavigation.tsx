import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {ProfileHeader} from 'containers';
import React from 'react';
import {ProfileScreen, ReadStoryScreen, SettingsScreen} from 'screens';
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
      <Stack.Screen
        name={AuthStackRoutes.Profile}
        component={ProfileScreen}
        options={{
          header: props => <ProfileHeader title="Perfil" {...props} />,
          headerShown: true,
        }}
      />
      <Stack.Screen
        name={AuthStackRoutes.Settings}
        component={SettingsScreen}
        options={{
          header: props => <ProfileHeader title="Configuración" {...props} />,
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export enum AuthStackRoutes {
  Tabs = 'Tabs',
  ReadStory = 'ReadStory',
  Profile = 'Profile',
  Settings = 'Settings',
}

export type AuthStackParams = {
  [AuthStackRoutes.Tabs]: undefined;
  [AuthStackRoutes.Settings]: undefined;
  [AuthStackRoutes.Profile]: {
    profileUsername: string;
  };
  [AuthStackRoutes.ReadStory]: {
    storyId: string;
  };
};

// Type to pass when use useNavigation hook
export type ReadStoryScreenProp = NativeStackNavigationProp<
  AuthStackParams,
  AuthStackRoutes.ReadStory
>;

export type ProfileScreenProp = NativeStackNavigationProp<
  AuthStackParams,
  AuthStackRoutes.Profile
>;

export type SettingsScreenProp = NativeStackNavigationProp<
  AuthStackParams,
  AuthStackRoutes.Settings
>;

export default AuthStackNavigation;

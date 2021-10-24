import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {AuthHeader, ProfileHeader} from 'containers';
import React from 'react';
import {Host} from 'react-native-portalize';
import {
  ProfileScreen,
  ReadStoryScreen,
  SearchScreen,
  SettingsScreen,
} from 'screens';
import AuthTabsNavigation from './AuthTabsNavigation';

const Stack = createNativeStackNavigator<AuthStackParams>();

const AuthStackNavigation = () => {
  return (
    <Host>
      <Stack.Navigator
        screenOptions={{
          header: props => <AuthHeader {...props} />,
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
        <Stack.Screen name={AuthStackRoutes.Search} component={SearchScreen} />
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
    </Host>
  );
};

export enum AuthStackRoutes {
  Tabs = 'Tabs',
  ReadStory = 'ReadStory',
  Profile = 'Profile',
  Settings = 'Settings',
  Search = 'Search',
}

export type AuthStackParams = {
  [AuthStackRoutes.Tabs]: undefined;
  [AuthStackRoutes.Settings]: undefined;
  [AuthStackRoutes.Search]: undefined;
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

export type SearchScreenProp = NativeStackNavigationProp<
  AuthStackParams,
  AuthStackRoutes.Settings
>;

export default AuthStackNavigation;

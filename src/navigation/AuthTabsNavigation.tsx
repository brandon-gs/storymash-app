import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AllStoriesScreen} from 'screens';
import {AuthHeader, TabBar} from 'containers';
import RankStoriesScreen from 'screens/RankStoriesScreen';

export enum AuthTabsRoutes {
  Home = 'Home',
  Plank = 'Plank',
  CreateStory = 'CreateStory',
  Favorites = 'Favorites',
  Rank = 'Rank',
}

export type AuthTabsParams = {
  [AuthTabsRoutes.Home]: undefined;
  [AuthTabsRoutes.Plank]: undefined;
  [AuthTabsRoutes.CreateStory]: undefined;
  [AuthTabsRoutes.Favorites]: undefined;
  [AuthTabsRoutes.Rank]: undefined;
};

const Tab = createBottomTabNavigator<AuthTabsParams>();

const AuthTabsNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        header: props => <AuthHeader {...props} />,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen name={AuthTabsRoutes.Home} component={AllStoriesScreen} />
      <Tab.Screen name={AuthTabsRoutes.Plank} component={AllStoriesScreen} />
      <Tab.Screen
        name={AuthTabsRoutes.CreateStory}
        component={AllStoriesScreen}
      />
      <Tab.Screen
        name={AuthTabsRoutes.Favorites}
        component={AllStoriesScreen}
      />
      <Tab.Screen name={AuthTabsRoutes.Rank} component={RankStoriesScreen} />
    </Tab.Navigator>
  );
};

export default AuthTabsNavigation;

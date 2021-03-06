import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {
  Dimensions,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {makeStyles, useTheme} from 'react-native-elements';

const {width} = Dimensions.get('window');
const useStyles = makeStyles(theme => ({
  container: {
    width,
    backgroundColor: 'white',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: `${theme.colors?.primary}50`,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 22.6,
  },
}));
export const SIZE = width / 5 - 10.7;

const ICON_SIZE = 28;

const Tabbar = ({navigation, state, descriptors}: BottomTabBarProps) => {
  const styles = useStyles();
  const {theme} = useTheme();
  const routeKey = state.routes[state.index].key;
  const {
    options: {tabBarStyle},
  } = descriptors[routeKey];
  return (
    <View style={[styles.container, tabBarStyle as StyleProp<ViewStyle>]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const iconName = getIconName(index, isFocused);

        const {options} = descriptors[route.key];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const tabBarIconStyles = options.tabBarIconStyle
          ? (options.tabBarStyle as StyleProp<ViewStyle>)
          : {};

        return (
          <TouchableOpacity
            key={`icon-tabbar-${index}-${iconName}`}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <Icon
              selectable={!isFocused}
              name={iconName}
              color={theme.colors?.primary}
              size={ICON_SIZE}
              style={[styles.icon, tabBarIconStyles]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const ICONS = ['home', 'bookmarks', 'add-circle', 'heart', 'stats-chart'];
const getIconName = (index: number, isFocused: boolean) => {
  if (ICONS[index]) {
    const outline = !isFocused ? '-outline' : '';
    return ICONS[index] + outline;
  }
  // Return home icon by default in case index doesn't exist in ICONS
  return ICONS[0];
};

export default Tabbar;

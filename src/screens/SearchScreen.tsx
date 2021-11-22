import {Loader} from 'components';
import {SearchHeader, SearchProfiles, SearchStoriesList} from 'containers';
import {useLoader, useThunkDispatch} from 'hooks';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {useTheme} from 'react-native-elements';
import {
  NavigationState,
  SceneRendererProps,
  TabBar,
  TabView,
} from 'react-native-tab-view';
import actions from 'store/actions';

enum RoutesKeys {
  stories = 'stories',
  people = 'people',
}

type RenderScene = SceneRendererProps & {
  route: {
    key: RoutesKeys;
    title: string;
  };
};

type RenderTab = SceneRendererProps & {
  navigationState: NavigationState<{
    key: RoutesKeys;
    title: string;
  }>;
};

function SearchScreen() {
  const layout = useWindowDimensions();
  const {theme} = useTheme();
  const dispatch = useThunkDispatch();

  // Allow know if we do at least one request to render tabs
  const [loading, enableLoading, disableLoading] = useLoader(false);
  const [hasResults, enableHasResults] = useLoader(false);
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    {
      key: RoutesKeys.stories,
      title: 'Historias',
    },
    {
      key: RoutesKeys.people,
      title: 'Personas',
    },
  ]);

  // Get the first page of stories and profiles
  const getSearchResults = useCallback(() => {
    const get = async () => {
      enableLoading();
      await dispatch(actions.search.getSearchResults());
      setIndex(0);
      enableHasResults();
      disableLoading();
    };
    get();
  }, [dispatch, enableHasResults, enableLoading, disableLoading]);

  // Screens that gonna be render in each tab depending the route.key
  const renderScene = useCallback((props: RenderScene) => {
    switch (props.route.key) {
      case RoutesKeys.stories: {
        return <SearchStoriesList />;
      }
      case RoutesKeys.people: {
        return <SearchProfiles />;
      }
      default: {
        return null;
      }
    }
  }, []);

  // Render a custom tabbar
  const renderTabBar = useCallback(
    (props: RenderTab) => (
      <TabBar
        {...props}
        style={styles.tabItem}
        labelStyle={[{color: theme.colors?.main?.main}, styles.tabItemTitle]}
        indicatorStyle={{backgroundColor: theme.colors?.main?.main}}
      />
    ),
    [theme.colors],
  );

  // Reset query in unmount screen
  useEffect(() => {
    return () => {
      dispatch(actions.search.setQuery(''));
    };
  }, [dispatch]);

  return (
    <>
      <SearchHeader onSearch={getSearchResults} />
      {hasResults && !loading && (
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
          initialLayout={{width: layout.width}}
        />
      )}
      {loading && <Loader />}
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    backgroundColor: 'white',
  },
  tabItemTitle: {
    fontWeight: '500',
  },
});

export default SearchScreen;

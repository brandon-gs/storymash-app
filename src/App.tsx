import React from 'react';
// Components
import {Provider} from 'react-redux';
import {ThemeProvider} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// Configs
import {persistor, store} from 'store/store';
import theme from 'theme/theme';
// Navigation
import RootNavigation from 'navigation/RootNavigation';
// Timeago
import moment from 'moment';
import 'moment/locale/es-mx';
moment.locale('es-mx');

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <NavigationContainer>
              <RootNavigation />
            </NavigationContainer>
          </SafeAreaProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

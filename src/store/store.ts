import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, applyMiddleware} from 'redux';
import {PersistConfig, persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const persistConfig: PersistConfig<unknown, any, any, any> = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['authentication'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer as any);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
export const jestStore = createStore(persistedReducer, applyMiddleware(thunk));
export const jestPersistor = persistStore(store);

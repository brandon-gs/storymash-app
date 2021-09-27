import {AuthState} from './types/auth.types';
import {StoriesState} from './types/stories.types';
import {StoryState} from './types/story.types';

export interface RootState {
  authentication: AuthState;
  stories: StoriesState;
  story: StoryState;
}

declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
}

declare module 'redux-persist/es/persistReducer' {
  interface PersistPartial extends RootState {}
}
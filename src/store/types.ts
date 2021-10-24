import {AuthState} from './types/auth.types';
import {FavoritesStoriesState} from './types/favorites.types';
import {PlankStoriesState} from './types/plank.types';
import {ProfileState} from './types/profile.types';
import {RankStoriesState} from './types/rank.types';
import {SearchState} from './types/search.types';
import {StoriesState} from './types/stories.types';
import {StoryState} from './types/story.types';

export interface RootState {
  authentication: AuthState;
  stories: StoriesState;
  story: StoryState;
  profile: ProfileState;
  rank: RankStoriesState;
  favorites: FavoritesStoriesState;
  plank: PlankStoriesState;
  search: SearchState;
}

declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
}

declare module 'redux-persist/es/persistReducer' {
  interface PersistPartial extends RootState {}
}

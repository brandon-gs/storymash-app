import {combineReducers} from 'redux';

import authentication from './auth.reducer';
import stories from './stories.reducer';
import story from './story.reducer';
import profile from './profile.reducer';
import rank from './rank.reducer';
import favorites from './favorites.reducer';
import plank from './plank.reducer';

export default combineReducers({
  authentication,
  stories,
  story,
  profile,
  rank,
  favorites,
  plank,
});

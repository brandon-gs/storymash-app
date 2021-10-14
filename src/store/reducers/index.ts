import {combineReducers} from 'redux';

import authentication from './auth.reducer';
import stories from './stories.reducer';
import story from './story.reducer';
import profile from './profile.reducer';
import rank from './rank.reducer';

export default combineReducers({
  authentication,
  stories,
  story,
  profile,
  rank,
});

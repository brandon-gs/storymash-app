import {combineReducers} from 'redux';

import authentication from './auth.reducer';
import stories from './stories.reducer';
import story from './story.reducer';
import profile from './profile.reducer';

export default combineReducers({
  authentication,
  stories,
  story,
  profile,
});

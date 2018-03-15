import { combineReducers } from 'redux';
import list from './list';
import devices from './devices';
import user from './user';

const rootReducer = combineReducers({
  list,
  devices,
  user
});

export default rootReducer;

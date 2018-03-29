import { combineReducers } from 'redux';
import list from './list';
import currentPosition from './geolocation';
import devices from './devices';
import user from './user';

const rootReducer = combineReducers({
  list,
  currentPosition,
  devices,
  user,
});

export default rootReducer;

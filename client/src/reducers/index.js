import { combineReducers } from 'redux';
import api from './api';
import list from './list';
import currentPosition from './geolocation';
import devices from './devices';
import user from './user';

const rootReducer = combineReducers({
  api,
  list,
  currentPosition,
  devices,
  user,
});

export default rootReducer;

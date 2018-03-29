import * as actions from '../actions/geolocation_actions'
import cookie from 'react-cookies'

const currentPosition = {
  latitude: null,
  longitude: null,
};

export default (state = currentPosition, action) => {
  switch (action.type) {

    case actions.RECEIVE_CURRENT_POSITION:
      return {
        latitude: action.coords.latitude,
        longitude: action.coords.longitude,
      }

    default:
      return state;
  }
};

import { DEVICES_ACTIONS } from '../consts/action_types';
import { LISTS } from '../consts/default_state';
import * as actions from '../actions/devices_actions'


const devices = {
  isFetching: false,
  isAdding: false,
  isRemoving: false,
  list: []
};

export default (state = devices, action) => {
  switch (action.type) {
    case actions.REQUEST_DEVICES:
      return { ...state, isFetching: true }
    case actions.RECEIVE_DEVICES:
      return {
        ...state,
        isFetching: false,
        list: action.list,
        lastUpdated: action.receivedAt,
      }

    case actions.REQUEST_ADD_DEVICE:
      return { ...state, isAdding: true }
    case actions.RECEIVE_ADD_DEVICE:
      state.list.push(action.device);
      return {
        ...state,
        isRemoving: false,
      }

    case actions.REQUEST_REMOVE_DEVICE:
      return { ...state, isRemoving: true }
    case actions.RECEIVE_REMOVE_DEVICE:
      state.list = state.list.filter(function (device) {
        return device.id != action.device.id;
      });
      return {
        ...state,
        isRemoving: false,
      }

    case DEVICES_ACTIONS.ITEM_ADD:
      action.item.id = Math.floor(Math.random() * (1000 - 4 + 1)) + 4;
      state.list.push(action.item);
      return { ...state };
    case DEVICES_ACTIONS.ITEM_REMOVE:
      state.list = state.list.filter(function (item) {
        return item.id != action.id;
      });
      return { ...state };
    default:
      return state;
  }
};
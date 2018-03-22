import { DEVICES_ACTIONS } from '../consts/action_types';
import { LISTS } from '../consts/default_state';
import * as actions from '../actions/devices_actions'
import cookie from 'react-cookies'

const devices = {
  currentDeviceId: null,
  focusDeviceId: null,

  selectedDevice: null,

  isFetching: false,
  isAdding: false,
  errorAdd: false,

  editing: false,
  editError: false,

  isRemoving: false,
  errorRemove: false,
  isUpdating: false,
  list: []
};

export default (state = devices, action) => {
  switch (action.type) {

    case actions.SET_CURRENT_DEVICE:
      state.currentDeviceId = action.device.id;
      cookie.save('current_device', action.device.id, { path: '/' })
      return { ...state }

    case actions.SET_FOCUS_DEVICE:
      state.focusDeviceId = action.device.id;
      cookie.save('focus_device', action.device.id, { path: '/' })
      return { ...state }

    case actions.SELECT_DEVICE:
      return { ...state, selectedDevice: action.device }
    case actions.UNSELECT_DEVICE:
      return { ...state, selectedDevice: null }


    case actions.REQUEST_DEVICES:
      return { ...state, isFetching: true }
    case actions.RECEIVE_DEVICES:
      state.currentDeviceId = cookie.load('current_device')
      state.focusDeviceId = cookie.load('focus_device')
      return {
        ...state,
        isFetching: false,
        list: action.list,
        lastUpdated: action.receivedAt,
      }
    case actions.RECEIVE_FAIL_DEVICES:
      return { ...state, isFetching: false }


    case actions.ADD_DEVICE:
      return { ...state, errorAdd: false }
    case actions.REQUEST_ADD_DEVICE:
      return { ...state, isAdding: true }
    case actions.RECEIVE_ADD_DEVICE:
      state.list.push(action.device);
      return { ...state, isAdding: false }
    case actions.RECEIVE_FAIL_ADD_DEVICE:
      return { ...state, errorAdd: action.error }


    case actions.SET_DEVICE:
      return { ...state, editing: action.device.id, editError: false }
    /*
    case actions.REQUEST_SET_DEVICE:
      return { ...state, editing: true }
    */
    case actions.RECEIVE_SET_DEVICE:
      state.list = state.list.map(function (device) {
        return device.id == action.device.id ? action.device : device;
      });
      return { ...state, editing: false }
    case actions.RECEIVE_FAIL_SET_DEVICE:
      let error = {
        id: state.editing,
        message: action.error.message
      }
      return { ...state, editError: error, editing: false }


    case actions.REMOVE_DEVICE:
      return { ...state, errorRemove: false }
    case actions.REQUEST_REMOVE_DEVICE:
      return { ...state, isRemoving: true }
    case actions.RECEIVE_REMOVE_DEVICE:
      state.list = state.list.filter(function (device) {
        return device.id != action.device.id;
      });
      return { ...state, isRemoving: false, }
    case actions.RECEIVE_FAIL_REMOVE_DEVICE:
      return { ...state, errorRemove: action.error }


    case actions.SET_DEVICE_POSITION:
      return { ...state, errorSetPosition: false }
    case actions.REQUEST_SET_DEVICE_POSITION:
      return { ...state, isUpdating: true }
    case actions.RECEIVE_SET_DEVICE_POSITION:
      state.list = state.list.map(function (device) {
        return device.id == action.device.id ? action.device : device;
      });
      return { ...state, isUpdating: false }
    case actions.RECEIVE_FAIL_SET_DEVICE_POSITION:
      return { ...state, errorSetPosition: action.error }






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
import { DEVICES_ACTIONS } from '../consts/action_types';
import { LISTS } from '../consts/default_state';
import * as actions from '../actions/devices_actions'
import cookie from 'react-cookies'

const devices = {
  currentDeviceId: null,
  focusDeviceId: null,
  actionDevice: null,

  isFetching: false,
  
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


    case actions.DEVICE_ADD:
      return {
        ...state,
        actionDevice: { sending: true, error: false },
      }
    case actions.DEVICE_ADD_DONE:
      state.actionDevice = { sending: false }
      state.list.push(action.device);
      return { ...state }
    case actions.DEVICE_ADD_FAIL:
      state.actionDevice = {
        error: action.error.message,
        sending: false,
      }
      return { ...state }


    case actions.DEVICE_EDIT:
      return {
        ...state,
        actionDevice: { id: action.device.id, sending: true, error: false },
      }
    case actions.DEVICE_EDIT_DONE:
      state.actionDevice.sending = false
      state.list = state.list.map(function (device) {
        return device.id == action.device.id ? action.device : device;
      });
      return { ...state }
    case actions.DEVICE_EDIT_FAIL:
      state.actionDevice = {
        id: state.actionDevice.id || state.error.id,
        error: action.error.message,
        sending: false,
      }
      return { ...state }


    case actions.DEVICE_REMOVE:
      return {
        ...state,
        actionDevice: { id: action.device.id, sending: true, error: false },
      }
    case actions.DEVICE_REMOVE_DONE:
      state.actionDevice = false
      state.list = state.list.filter(function (device) {
        return device.id != action.device.id;
      });
      return { ...state }
    case actions.DEVICE_REMOVE_FAIL:
      state.actionDevice = {
        id: state.actionDevice.id || state.error.id,
        error: action.error.message,
        sending: false,
      }
      return { ...state }


    case actions.DEVICE_EDIT_POSITION:
      return { ...state, errorSetPosition: false }
    case actions.DEVICE_EDIT_POSITION_REQUEST:
      return { ...state, isUpdating: true }
    case actions.DEVICE_EDIT_POSITION_DONE:
      state.list = state.list.map(function (device) {
        return device.id == action.device.id ? action.device : device;
      });
      return { ...state, isUpdating: false }
    case actions.DEVICE_EDIT_POSITION_FAIL:
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
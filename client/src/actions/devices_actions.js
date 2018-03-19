import { DEVICES_ACTIONS } from '../consts/action_types';
/*
export const DEVICES_ACTIONS = {
  ITEM_PREVIEW: 'DEVICES_ITEM_PREVIEW',
  ITEM_VIEW: 'DEVICES_ITEM_VIEW',
  ITEM_ADD: 'DEVICES_ITEM_ADD',
  ITEM_REMOVE: 'DEVICES_ITEM_REMOVE',
};
*/
export const REQUEST_DEVICES = 'REQUEST_DEVICES'
export const RECEIVE_DEVICES = 'RECEIVE_DEVICES'
export const REQUEST_ADD_DEVICE = 'REQUEST_ADD_DEVICE'
export const RECEIVE_ADD_DEVICE = 'RECEIVE_ADD_DEVICE'
export const REQUEST_SET_DEVICE = 'REQUEST_SET_DEVICE'
export const RECEIVE_SET_DEVICE = 'RECEIVE_SET_DEVICE'
export const REQUEST_REMOVE_DEVICE = 'REQUEST_REMOVE_DEVICE'
export const RECEIVE_REMOVE_DEVICE = 'RECEIVE_REMOVE_DEVICE'
export const SET_CURRENT_DEVICE = 'SET_CURRENT_DEVICE'
export const SET_FOCUS_DEVICE = 'SET_FOCUS_DEVICE'

export const REQUEST_SET_DEVICE_POSITION = 'REQUEST_SET_DEVICE_POSITION'
export const RECEIVE_SET_DEVICE_POSITION = 'RECEIVE_SET_DEVICE_POSITION'

export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

export const requestDevices = () => ({
  type: REQUEST_DEVICES,
})

export const receiveDevices = (list) => ({
  type: RECEIVE_DEVICES,
  list,
  receivedAt: Date.now(),
})

export const requestAddDevice = (device) => ({
  type: REQUEST_ADD_DEVICE,
  device,
})

export const receiveAddDevice = (device) => ({
  type: RECEIVE_ADD_DEVICE,
  device,
})

export const requestSetDevice = (device) => ({
  type: REQUEST_SET_DEVICE,
  device,
})

export const receiveSetDevice = (device) => ({
  type: RECEIVE_SET_DEVICE,
  device,
})

export const requestRemoveDevice = (id) => ({
  type: REQUEST_REMOVE_DEVICE,
  id,
})

export const receiveRemoveDevice = (device) => ({
  type: RECEIVE_REMOVE_DEVICE,
  device,
})

export const setCurrentDevice = (device) => ({
  type: SET_CURRENT_DEVICE,
  device,
})

export const setFocusDevice = (device) => ({
  type: SET_FOCUS_DEVICE,
  device,
})

export const requestSetDevicePosition = (device) => ({
  type: REQUEST_SET_DEVICE_POSITION,
  device,
})

export const receiveSetDevicePosition = (device) => ({
  type: RECEIVE_SET_DEVICE_POSITION,
  device,
})



export const previewItem = id => ({
	type: DEVICES_ACTIONS.ITEM_PREVIEW,
	id,
});

export const viewItem = id => ({
	type: DEVICES_ACTIONS.ITEM_VIEW,
	id,
});

export const addItem = item => ({
	type: DEVICES_ACTIONS.ITEM_ADD,
	item,
});

export const removeItem = id => ({
  type: DEVICES_ACTIONS.ITEM_REMOVE,
  id,
});

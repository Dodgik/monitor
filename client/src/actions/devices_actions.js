import { DEVICES_ACTIONS } from '../consts/action_types';
/*
export const DEVICES_ACTIONS = {
  ITEM_PREVIEW: 'DEVICES_ITEM_PREVIEW',
  ITEM_VIEW: 'DEVICES_ITEM_VIEW',
  ITEM_ADD: 'DEVICES_ITEM_ADD',
  ITEM_REMOVE: 'DEVICES_ITEM_REMOVE',
};
*/
export const SET_CURRENT_DEVICE = 'SET_CURRENT_DEVICE'
export const SET_FOCUS_DEVICE = 'SET_FOCUS_DEVICE'

export const SELECT_DEVICE = 'SELECT_DEVICE'
export const UNSELECT_DEVICE = 'UNSELECT_DEVICE'

export const FETCH_DEVICES = 'FETCH_DEVICES'
export const REQUEST_DEVICES = 'REQUEST_DEVICES'
export const RECEIVE_DEVICES = 'RECEIVE_DEVICES'
export const RECEIVE_FAIL_DEVICES = 'RECEIVE_FAIL_DEVICES'

export const DEVICE_ADD = 'DEVICE_ADD'
export const DEVICE_ADD_REQUEST = 'DEVICE_ADD_REQUEST'
export const DEVICE_ADD_DONE = 'DEVICE_ADD_DONE'
export const DEVICE_ADD_FAIL = 'DEVICE_ADD_FAIL'

export const DEVICE_EDIT = 'DEVICE_EDIT'
export const DEVICE_EDIT_REQUEST = 'DEVICE_EDIT_REQUEST'
export const DEVICE_EDIT_DONE = 'DEVICE_EDIT_DONE'
export const DEVICE_EDIT_FAIL = 'DEVICE_EDIT_FAIL'

export const DEVICE_REMOVE = 'DEVICE_REMOVE'
export const DEVICE_REMOVE_REQUEST = 'DEVICE_REMOVE_REQUEST'
export const DEVICE_REMOVE_DONE = 'DEVICE_REMOVE_DONE'
export const DEVICE_REMOVE_FAIL = 'DEVICE_REMOVE_FAIL'

export const DEVICE_EDIT_POSITION = 'DEVICE_EDIT_POSITION'
export const DEVICE_EDIT_POSITION_REQUEST = 'DEVICE_EDIT_POSITION_REQUEST'
export const DEVICE_EDIT_POSITION_DONE = 'DEVICE_EDIT_POSITION_DONE'
export const DEVICE_EDIT_POSITION_FAIL = 'DEVICE_EDIT_POSITION_FAIL'

export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'


export const setCurrentDevice = (device) => ({ type: SET_CURRENT_DEVICE, device, })

export const setFocusDevice = (device) => ({ type: SET_FOCUS_DEVICE, device, })

export const selectDevice = (device) => ({ type: SELECT_DEVICE, device, })
export const unselectDevice = (device) => ({ type: UNSELECT_DEVICE, device, })



export const fetchDevices = () => ({ type: FETCH_DEVICES })

export const requestDevices = () => ({ type: REQUEST_DEVICES })

export const receiveDevices = (list) => ({ type: RECEIVE_DEVICES, list, receivedAt: Date.now(), })

export const receiveFailDevices = (error) => ({ type: RECEIVE_FAIL_DEVICES, error, })


export const addDevice = (device) => ({ type: DEVICE_ADD, device, })

export const requestAddDevice = (device) => ({ type: DEVICE_ADD_REQUEST, device, })

export const receiveAddDevice = (device) => ({ type: DEVICE_ADD_DONE, device, })

export const receiveFailAddDevice = (error) => ({ type: DEVICE_ADD_FAIL, error, })


export const setDevice = (device) => ({ type: DEVICE_EDIT, device, })

export const requestSetDevice = (device) => ({ type: DEVICE_EDIT_REQUEST, device, })

export const receiveSetDevice = (device) => ({ type: DEVICE_EDIT_DONE, device, })

export const receiveFailSetDevice = (error) => ({ type: DEVICE_EDIT_FAIL, error, })


export const removeDevice = (device) => ({ type: DEVICE_REMOVE, device, })

export const requestRemoveDevice = (device) => ({ type: DEVICE_REMOVE_REQUEST, device, })

export const receiveRemoveDevice = (device) => ({ type: DEVICE_REMOVE_DONE, device, })

export const receiveFailRemoveDevice = (error) => ({ type: DEVICE_REMOVE_FAIL, error, })


export const setDevicePosition = (device) => ({ type: DEVICE_EDIT_POSITION, device, })

export const requestSetDevicePosition = (device) => ({ type: DEVICE_EDIT_POSITION_REQUEST, device, })

export const receiveSetDevicePosition = (device) => ({ type: DEVICE_EDIT_POSITION_DONE, device, })

export const receiveFailSetDevicePosition = (error) => ({ type: DEVICE_EDIT_POSITION_FAIL, error, })



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

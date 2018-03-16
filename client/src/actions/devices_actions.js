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
export const REQUEST_REMOVE_DEVICE = 'REQUEST_REMOVE_DEVICE'
export const RECEIVE_REMOVE_DEVICE = 'RECEIVE_REMOVE_DEVICE'
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

export const requestRemoveDevice = (id) => ({
  type: REQUEST_REMOVE_DEVICE,
  id,
})

export const receiveRemoveDevice = (device) => ({
  type: RECEIVE_REMOVE_DEVICE,
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
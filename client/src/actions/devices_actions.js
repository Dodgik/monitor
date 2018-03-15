import { DEVICES_ACTIONS } from '../consts/action_types';

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

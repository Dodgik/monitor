import { LIST_ACTIONS } from '../consts/action_types';

export const MINIMIZE_MENU = 'MINIMIZE_MENU'
export const OPEN_MENU = 'OPEN_MENU'

export const ITEM_PREVIEW = 'ITEM_PREVIEW'
export const ITEM_VIEW = 'ITEM_VIEW'
export const ITEM_ADD = 'ITEM_ADD'
export const ITEM_CLEAR = 'ITEM_CLEAR'

export const minimizeMenu = () => ({ type: MINIMIZE_MENU, })
export const openMenu = () => ({ type: OPEN_MENU, })

export const previewItem = name => ({
  type: LIST_ACTIONS.ITEM_PREVIEW,
  name, // shorthand for name: name
});

export const viewItem = name => ({
  type: LIST_ACTIONS.ITEM_VIEW,
  name,
});

export const addItem = item => ({
  type: LIST_ACTIONS.ITEM_ADD,
  item, // shorthand for item: item
});

export const clearItem = () => ({
  type: LIST_ACTIONS.ITEM_CLEAR,
});

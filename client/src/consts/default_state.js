import LIST_ITEMS from './list_items';

const defaultItemName = 'devices';
// eslint-disable-next-line
export const LISTS = {
  menuClosed: false,
  items: LIST_ITEMS,
  itemPreview: null,
  itemView: LIST_ITEMS[defaultItemName.toUpperCase()],
  defaultItemName: defaultItemName
}

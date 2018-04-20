import menuItems from './menuItems';

const defaultItemName = 'devices';
// eslint-disable-next-line
export const LISTS = {
  menuClosed: false,
  items: menuItems,
  itemPreview: null,
  itemView: menuItems[defaultItemName.toUpperCase()],
  defaultItemName: defaultItemName
}

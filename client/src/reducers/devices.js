import { DEVICES_ACTIONS } from '../consts/action_types';
import { LISTS } from '../consts/default_state';

const devicesItems = [
  {
    id: 1,
    name: 'pc_device',
    default: true,
    title: 'My PC',
    description: 'To use Devices please sign up.',
  },
  {
    id: 2,
    name: 'iPod',
    title: 'My iPod',
    description: 'To use Devices please sign up.',
  },
  {
    id: 3,
    name: 'iPad',
    title: 'My iPad Mini',
    description: 'To use Devices please sign up.',
  }
];
const devices = {
  items: devicesItems
};

export default (state = devices, action) => {
  switch (action.type) {
    case DEVICES_ACTIONS.ITEM_ADD:
      action.item.id = Math.floor(Math.random() * (1000 - 4 + 1)) + 4;
      state.items.push(action.item);
      return { ...state };
    case DEVICES_ACTIONS.ITEM_REMOVE:
      state.items = state.items.filter(function (item) {
        return item.id != action.id;
      });
      return { ...state };
    default:
      return state;
  }
};
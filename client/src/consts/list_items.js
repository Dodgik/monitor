export default {
  DEVICES: {
    name: 'devices',
    title: 'Devices',
    component: 'Devices',
    default: true,
    preview: false,
    description: 'To use Devices please sign up.',
  },
  GROUPS: {
    name: 'groups',
    title: 'Groups',
    component: 'Groups',
    preview: false,
    description: 'To use Groups please sign up.',
  },
  ACCOUNT: {
    name: 'account',
    title: 'Account',
    component: 'Account',
    preview: false,
    description: 'To use Account please sign up.',
  },
  ACTIONS: {
    name: 'actions',
    title: 'Actions',
    preview: true,
    description: 'Actions are payloads of information that send data from your application to your store. They are the only source of information for the store.',
  },
  STORE: {
    name: 'store',
    title: 'Store',
    preview: true,
    description: 'The state of your whole application is stored in an object tree within a single store.',
  },
  REDUCERS: {
    name: 'reducers',
    title: 'Reducers',
    preview: true,
    description: 'Actions describe the fact that something happened, but don\'t specify how the application\'s state changes in response. This is the job of reducers.',
  },
};

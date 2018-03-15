
const USER_ACTIONS = {
  LOG_IN: 'LOG_IN',
  LOG_OUT: 'LOG_OUT',
};
const user = {
  displayName: 'Guest',
  loggedIn: false
};

export default (state = user, action) => {
  switch (action.type) {
    case USER_ACTIONS.LOG_IN:
      return { ...state, loggedIn: true };
    case USER_ACTIONS.LOG_OUT:
      return { ...state, loggedIn: false };
    default:
      return state;
  }
};
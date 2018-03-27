import * as user_actions from '../actions/user_actions'

const USER_ACTIONS = {
  LOG_IN: 'LOG_IN',
  LOG_OUT: 'LOG_OUT',
};
const user = {
  displayName: 'Guest',
  loggedIn: false,
  recovery: false,
};

export default (state = user, action) => {
  switch (action.type) {
    case USER_ACTIONS.LOG_IN:
      return { ...state, loggedIn: true };
    case USER_ACTIONS.LOG_OUT:
      return { ...state, loggedIn: false };


    case user_actions.LOGIN_SEND:
      return {
        ...state,
        sending: true,
      }
    case user_actions.LOGIN_DONE:
      return {
        ...state,
        ...action.user.user,
        sending: false,
        message: action.user.message,
      }
    case user_actions.LOGIN_FAIL:
      return {
        ...state,
        sending: false,
        error: action.error.message,
      }
      

    case user_actions.LOGOUT_SEND:
      return {
        ...state,
        sending: true,
      }
    case user_actions.LOGOUT_DONE:
      return {
        ...state,
        ...action.user.user,
        sending: false,
        message: action.user.message,
      }
    case user_actions.LOGOUT_FAIL:
      return {
        ...state,
        sending: false,
        error: action.error.message,
      }

      
      
    case user_actions.FORGOT_OPEN:
      return {
        ...state,
        message: false,
        error: false,
      }
    case user_actions.FORGOT_SEND:
      return {
        ...state,
        sending: true,
      }
    case user_actions.FORGOT_DONE:
      return {
        ...state,
        sending: false,
        message: action.user.message,
      }
    case user_actions.FORGOT_FAIL:
      return {
        ...state,
        sending: false,
        error: action.error.message,
      }


    case user_actions.RESET_CLOSE:
      return {
        ...state,
        recovery: false,
        message: false,
        error: false,
      }
    case user_actions.RESET_SEND:
      return {
        ...state,
        sending: true,
      }
    case user_actions.RESET_DONE:
      return {
        ...state,
        ...action.user.user,
        sending: false,
        message: action.user.message,
      }
    case user_actions.RESET_FAIL:
      return {
        ...state,
        sending: false,
        error: action.error.message,
      }

    default:
      return state;
  }
};
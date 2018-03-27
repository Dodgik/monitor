
export const USER_GET = 'USER_GET'

export const LOGIN_SEND = 'LOGIN_SEND'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_DONE = 'LOGIN_DONE'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export const LOGOUT_SEND = 'LOGOUT_SEND'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_DONE = 'LOGOUT_DONE'
export const LOGOUT_FAIL = 'LOGOUT_FAIL'

export const FORGOT_OPEN = 'FORGOT_OPEN'
export const FORGOT_SEND = 'FORGOT_SEND'
export const FORGOT_REQUEST = 'FORGOT_REQUEST'
export const FORGOT_DONE = 'FORGOT_DONE'
export const FORGOT_FAIL = 'FORGOT_FAIL'

export const RESET_CLOSE = 'RESET_CLOSE'
export const RESET_SEND = 'RESET_SEND'
export const RESET_REQUEST = 'RESET_REQUEST'
export const RESET_DONE = 'RESET_DONE'
export const RESET_FAIL = 'RESET_FAIL'


export const userGet = () => ({ type: USER_GET })


export const loginSend = (user) => ({ type: LOGIN_SEND, user })
export const loginRequest = (user) => ({ type: LOGIN_REQUEST, user })
export const receiveLoginDone = (user) => ({ type: LOGIN_DONE, user })
export const receiveLoginFail = (error) => ({ type: LOGIN_FAIL, error })

export const logoutSend = (user) => ({ type: LOGOUT_SEND, user })
export const logoutRequest = (user) => ({ type: LOGOUT_REQUEST, user })
export const receiveLogoutDone = (user) => ({ type: LOGOUT_DONE, user })
export const receiveLogoutFail = (error) => ({ type: LOGOUT_FAIL, error })

export const forgotOpen = (user) => ({ type: FORGOT_OPEN, user })
export const forgot = (user) => ({ type: FORGOT_SEND, user })
export const forgotRequest = (user) => ({ type: FORGOT_REQUEST, user })
export const receiveForgotDone = (user) => ({ type: FORGOT_DONE, user })
export const receiveForgotFail = (error) => ({ type: FORGOT_FAIL, error })

export const resetClose = () => ({ type: RESET_CLOSE })
export const resetSend = (user) => ({ type: RESET_SEND, user })
export const resetRequest = (user) => ({ type: RESET_REQUEST, user })
export const receiveResetDone = (user) => ({ type: RESET_DONE, user })
export const receiveResetFail = (error) => ({ type: RESET_FAIL, error })

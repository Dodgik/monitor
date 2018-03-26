
export const USER_GET = 'USER_GET'

export const FORGOT_OPEN = 'FORGOT_OPEN'
export const FORGOT_SEND = 'FORGOT_SEND'
export const FORGOT_REQUEST = 'FORGOT_REQUEST'
export const FORGOT_DONE = 'FORGOT_DONE'
export const FORGOT_FAIL = 'FORGOT_FAIL'



export const userGet = () => ({ type: USER_GET })


export const forgotOpen = (user) => ({ type: FORGOT_OPEN, user })

export const forgot = (user) => ({ type: FORGOT_SEND, user })

export const forgotRequest = (user) => ({ type: FORGOT_REQUEST, user })

export const receiveForgotDone = (user) => ({ type: FORGOT_DONE, user })

export const receiveForgotFail = (error) => ({ type: FORGOT_FAIL, error })



export const GET_CURRENT_POSITION = 'GET_CURRENT_POSITION'
export const WATCH_CURRENT_POSITION = 'WATCH_CURRENT_POSITION'

export const REQUEST_CURRENT_POSITION = 'REQUEST_CURRENT_POSITION'
export const RECEIVE_CURRENT_POSITION = 'RECEIVE_CURRENT_POSITION'
export const RECEIVE_CURRENT_POSITION_FAIL = 'RECEIVE_CURRENT_POSITION_FAIL'



export const getCurrentPosition = () => ({ type: GET_CURRENT_POSITION, })
export const watchCurrentPosition = (coords) => ({ type: WATCH_CURRENT_POSITION, coords, })

export const requestCurrentPosition = () => ({ type: REQUEST_CURRENT_POSITION, })

export const receiveCurrentPosition = (coords) => ({ type: RECEIVE_CURRENT_POSITION, coords, })

export const receiveCurrentPositionFail = (error) => ({ type: RECEIVE_CURRENT_POSITION_FAIL, error, })

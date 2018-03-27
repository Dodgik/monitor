/* eslint-disable no-constant-condition */

import { take, put, call, fork, select, takeEvery } from 'redux-saga/effects'
import * as actions from '../actions/devices_actions'
import { selectedRedditSelector, devicesListSelector } from '../reducers/selectors'

import api from '../api'
import deviceSaga from './devices'
import userSaga from './user'


export function* invalidateReddit() {
  while (true) {
    const { reddit } = yield take(actions.INVALIDATE_REDDIT)
    yield call(fetchDevices, reddit)
  }
}

export function* nextRedditChange() {
  while (true) {
    const prevReddit = yield select(selectedRedditSelector)
    yield take(actions.SELECT_REDDIT)

    const newReddit = yield select(selectedRedditSelector)
    const postsByReddit = yield select(devicesListSelector)
    if (prevReddit !== newReddit && !postsByReddit[newReddit]) yield fork(fetchDevices, newReddit)
  }
}

export function* startup() {
  //const selectedReddit = yield select(selectedRedditSelector)
  //yield fork(fetchDevices, selectedReddit)
}

export default function* root() {
  //yield fork(startup)
  //yield fork(nextRedditChange)
  //yield fork(invalidateReddit)
  
  yield fork(userSaga)
  yield fork(deviceSaga)
}

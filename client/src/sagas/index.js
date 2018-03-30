/* eslint-disable no-constant-condition */

import { fork } from 'redux-saga/effects'

import deviceSaga from './devices'
import userSaga from './user'
import geolocationSaga from './geolocation'


export default function* root() {
  yield fork(userSaga)
  yield fork(deviceSaga)
  yield fork(geolocationSaga)
}

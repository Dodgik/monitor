/* eslint-disable no-constant-condition */

import { take, put, call, fork, select } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'
import * as actions from '../actions/devices_actions'
import { selectedRedditSelector, devicesListSelector } from '../reducers/selectors'

const getProps = {
  method: 'GET',
  credentials: 'include'
};
const postProps = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  /*credentials: 'include',*/
};

export function fetchDevicesApi() {
  const initProps = Object.assign(postProps);
  return fetch(`http://localhost:3000/a/devices`, initProps)
    .then(response => response.json())
    .then(json => json)
}

export function* fetchDevices() {
  yield put(actions.requestDevices())
  const list = yield call(fetchDevicesApi)
  yield put(actions.receiveDevices(list))
}


export function addDeviceApi(data) {
  let body = JSON.stringify(data);
  const initProps = Object.assign(postProps, { body: body });
  return fetch(`http://localhost:3000/a/devices/add`, initProps)
    .then(response => response.json())
    .then(json => json)
}

export function* addDevice(data) {
  yield put(actions.requestAddDevice())
  const device = yield call(addDeviceApi, data)
  yield put(actions.receiveAddDevice(device))
}

export function* subscribeAddDevice() {
  while (true) {
    const { device } = yield take(actions.REQUEST_ADD_DEVICE)
    yield call(addDevice, device)
  }
}


export function removeDeviceApi(id) {
  let body = JSON.stringify({ id });
  const initProps = Object.assign(postProps, { body: body });
  return fetch(`http://localhost:3000/a/devices/remove`, initProps)
    .then(response => response.json())
    .then(json => json)
}

export function* removeDevice(id) {
  yield put(actions.requestRemoveDevice())
  const device = yield call(removeDeviceApi, id)
  yield put(actions.receiveRemoveDevice(device))
}

export function* subscribeRemoveDevice() {
  while (true) {
    const { id } = yield take(actions.REQUEST_REMOVE_DEVICE)
    yield call(removeDevice, id)
  }
}


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
  const selectedReddit = yield select(selectedRedditSelector)
  yield fork(fetchDevices, selectedReddit)
}

export default function* root() {
  yield fork(startup)
  yield fork(nextRedditChange)
  yield fork(invalidateReddit)
  yield fork(subscribeAddDevice)
  yield fork(subscribeRemoveDevice)
}

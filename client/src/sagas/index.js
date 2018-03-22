/* eslint-disable no-constant-condition */

import { take, put, call, fork, select, takeEvery } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'
import * as actions from '../actions/devices_actions'
import { selectedRedditSelector, devicesListSelector } from '../reducers/selectors'

const getProps = {
  method: 'GET',
  /*credentials: 'include',*/
};
const postProps = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  /*credentials: 'include',*/
};

export function fetchDevicesApi() {
  const initProps = Object.assign(getProps);
  return fetch(`http://localhost:3000/a/devices`, initProps)
    .then(response => response.json())
    .then(json => json)
}

export function* fetchDevices() {
  yield put(actions.requestDevices())
  try {
    const list = yield call(fetchDevicesApi)
    yield put(actions.receiveDevices(list))
  } catch (e) {
    yield put(actions.receiveFailDevices(e))
  }
}

export function* watchFetchDevice() {
  yield takeEvery(actions.FETCH_DEVICES, fetchDevices);
}


export function addDeviceApi(data) {
  let body = JSON.stringify(data);
  const initProps = Object.assign(postProps, { body: body });
  let response;
  return fetch(`http://localhost:3000/a/devices/add`, initProps)
    .then(res => {
      response = res
      return response.json();
    })
    .then(json => {
      if (response.ok) {
        return { response: json }
      } else {
        return { error: json }
      }
    })
    .catch(error => {
      return { error: error }
    })
}

export function* addDevice(data) {
  yield put(actions.requestAddDevice())
  try {
    const { response, error } = yield call(addDeviceApi, data)
    if (response) {
      console.log('response:', response)
      yield put(actions.receiveAddDevice(response))
    } else {
      console.log('error:', error)
      yield put(actions.receiveFailAddDevice(error))
    }
    
  } catch (e) {
    yield put(actions.receiveFailAddDevice(e))
  }
}

export function* watchAddDevice() {
  yield takeEvery(actions.ADD_DEVICE, addDevice);
}


export function setDeviceApi(data) {
  let body = JSON.stringify(data);
  const initProps = Object.assign(postProps, { body: body });
  return fetch(`http://localhost:3000/a/devices/set`, initProps)
    .then(response => response.json())
    .then(json => json)
}

export function* setDevice(data) {
  yield put(actions.requestSetDevice())
  const device = yield call(setDeviceApi, data)
  yield put(actions.receiveSetDevice(device))
}

export function* subscribeSetDevice() {
  while (true) {
    const { device } = yield take(actions.REQUEST_SET_DEVICE)
    yield call(setDevice, device)
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


export function setDevicePositionApi(data) {
  let body = JSON.stringify(data);
  const initProps = Object.assign(postProps, { body: body });
  return fetch(`http://localhost:3000/a/devices/pos`, initProps)
    .then(response => response.json())
    .then(json => json)
}

export function* setDevicePosition(data) {
  yield put(actions.requestSetDevicePosition())
  const device = yield call(setDevicePositionApi, data)
  yield put(actions.receiveSetDevicePosition(device))
}

export function* subscribeSetDevicePosition() {
  while (true) {
    const { device } = yield take(actions.REQUEST_SET_DEVICE_POSITION)
    yield call(setDevicePosition, device)
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
  //const selectedReddit = yield select(selectedRedditSelector)
  //yield fork(fetchDevices, selectedReddit)
  yield fork(fetchDevices)
}

export default function* root() {
  yield fork(startup)
  //yield fork(nextRedditChange)
  //yield fork(invalidateReddit)

  yield fork(watchFetchDevice)

  yield fork(watchAddDevice)
  yield fork(subscribeSetDevice)
  yield fork(subscribeRemoveDevice)
  yield fork(subscribeSetDevicePosition)
}

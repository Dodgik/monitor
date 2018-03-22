/* eslint-disable no-constant-condition */

import { take, put, call, fork, select, takeEvery } from 'redux-saga/effects'
import * as actions from '../actions/devices_actions'
import { selectedRedditSelector, devicesListSelector } from '../reducers/selectors'

import api from '../api'


export function* fetchDevices() {
  yield put(actions.requestDevices())
  try {
    const { response, error } = yield call(api.devices.all)
    if (response) {
      yield put(actions.receiveDevices(response))
    } else {
      yield put(actions.receiveFailDevices(error))
    }
  } catch (e) {
    yield put(actions.receiveFailDevices(e))
  }
}

export function* watchFetchDevice() {
  yield takeEvery(actions.FETCH_DEVICES, fetchDevices);
}



export function* addDevice(data) {
  yield put(actions.requestAddDevice())
  try {
    const { response, error } = yield call(api.devices.add, data)
    if (response) {
      yield put(actions.receiveAddDevice(response))
    } else {
      yield put(actions.receiveFailAddDevice(error))
    }
  } catch (e) {
    yield put(actions.receiveFailAddDevice(e))
  }
}

export function* watchAddDevice() {
  yield takeEvery(actions.ADD_DEVICE, addDevice);
}


export function* setDevice(data) {
  yield put(actions.requestSetDevice(data))
  try {
    const { response, error } = yield call(api.devices.set, data)
    if (response) {
      yield put(actions.receiveSetDevice(response))
    } else {
      yield put(actions.receiveFailSetDevice(error))
    }
  } catch (e) {
    yield put(actions.receiveFailSetDevice(e))
  }
}

export function* watchSetDevice() {
  yield takeEvery(actions.SET_DEVICE, setDevice);
}


export function* removeDevice(id) {
  yield put(actions.requestRemoveDevice(id))
  try {
    const { response, error } = yield call(api.devices.remove, data)
    if (response) {
      yield put(actions.receiveRemoveDevice(response))
    } else {
      yield put(actions.receiveFailRemoveDevice(error))
    }
  } catch (e) {
    yield put(actions.receiveFailRemoveDevice(e))
  }
}

export function* watchRemoveDevice() {
  yield takeEvery(actions.REMOVE_DEVICE, removeDevice);
}


export function* setDevicePosition(data) {
  yield put(actions.requestSetDevicePosition())
  try {
    const { response, error } = yield call(api.devices.pos, data)
    if (response) {
      yield put(actions.receiveSetDevicePosition(response))
    } else {
      yield put(actions.receiveFailSetDevicePosition(error))
    }
  } catch (e) {
    yield put(actions.receiveFailSetDevicePosition(e))
  }
}

export function* watchSetDevicePosition() {
  yield takeEvery(actions.SET_DEVICE_POSITION, setDevicePosition);
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
  yield fork(watchSetDevice)
  yield fork(watchRemoveDevice)
  yield fork(watchSetDevicePosition)
}

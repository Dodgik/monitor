/* eslint-disable no-constant-condition */

import { take, put, call, fork, select, takeEvery } from 'redux-saga/effects'
import * as actions from '../actions/devices_actions'

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
  yield put(actions.requestAddDevice(data.device))
  try {
    const { response, error } = yield call(api.devices.add, data.device)
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
  yield takeEvery(actions.DEVICE_ADD, addDevice);
}


export function* setDevice(data) {
  yield put(actions.requestSetDevice(data.device))
  try {
    const { response, error } = yield call(api.devices.set, data.device)
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
  yield takeEvery(actions.DEVICE_EDIT, setDevice);
}


export function* removeDevice(data) {
  yield put(actions.requestRemoveDevice(data.device))
  try {
    const { response, error } = yield call(api.devices.remove, data.device)
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
  yield takeEvery(actions.DEVICE_REMOVE, removeDevice);
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
  yield takeEvery(actions.DEVICE_EDIT_POSITION, setDevicePosition);
}


export function* startup() {
  yield fork(fetchDevices)
}

export default function* root() {
  yield fork(startup)

  yield fork(watchFetchDevice)

  yield fork(watchAddDevice)
  yield fork(watchSetDevice)
  yield fork(watchRemoveDevice)
  yield fork(watchSetDevicePosition)
}

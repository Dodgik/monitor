/* eslint-disable no-constant-condition */

import { eventChannel } from 'redux-saga'
import { take, put, call, fork, select, takeEvery } from 'redux-saga/effects'
import * as actions from '../actions/geolocation_actions'

import api from '../api'


export function* getPosition() {
  yield put(actions.requestCurrentPosition())
  try {
    const { response, error } = yield call(api.geolocation.getPosition)
    if (response) {
      yield put(actions.receiveCurrentPosition(response))
    } else {
      yield put(actions.receiveCurrentPositionFail(error))
    }
  } catch (e) {
    yield put(actions.receiveCurrentPositionFail(e))
  }
}

export function* watchGetPosition() {
  yield takeEvery(actions.GET_CURRENT_POSITION, getPosition);
}



export function* watchPosition(data) {
  const channel = yield call(subscribeWatchPosition)
  while (true) {
    try {
      let action = yield take(channel);
      //console.warn('---saga watchPosition action:', action)
      //throw coords 
      yield put(action);
    } catch (e) {
      yield put(actions.receiveCurrentPositionFail(e))
    }
  }
}

export function subscribeWatchPosition() {
  return eventChannel(emit => {
    let watchID = api.geolocation.subscribeWatchPosition(coords => {
      emit(actions.receiveCurrentPosition(coords));
    })
    return () => {
      api.geolocation.unsubscribeWatchPosition()
    };
  });
}


export function* startup() {
  yield fork(getPosition)
}

export default function* root() {
  yield fork(startup)

  yield fork(watchGetPosition)  
  yield fork(watchPosition)  
}

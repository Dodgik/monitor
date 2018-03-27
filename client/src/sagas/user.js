/* eslint-disable no-constant-condition */

import { take, put, call, fork, select, takeEvery } from 'redux-saga/effects'
import * as user_actions from '../actions/user_actions'

import api from '../api'



export function* userLogin(data) {
  yield put(user_actions.loginRequest(data.user))
  try {
    const { response, error } = yield call(api.user.login, data.user)
    if (response) {
      yield put(user_actions.receiveLoginDone(response))
    } else {
      yield put(user_actions.receiveLoginFail(error))
    }
  } catch (e) {
    yield put(user_actions.receiveLoginFail(e))
  }
}

export function* watchUserLogin() {
  yield takeEvery(user_actions.LOGIN_SEND, userLogin);
}


export function* userLogout(data) {
  yield put(user_actions.logoutRequest(data.user))
  try {
    const { response, error } = yield call(api.user.logout, data.user)
    if (response) {
      yield put(user_actions.receiveLogoutDone(response))
    } else {
      yield put(user_actions.receiveLogoutFail(error))
    }
  } catch (e) {
    yield put(user_actions.receiveLogoutFail(e))
  }
}

export function* watchUserLogout() {
  yield takeEvery(user_actions.LOGOUT_SEND, userLogout);
}

export function* userForgot(data) {
  yield put(user_actions.forgotRequest(data.user))
  try {
    const { response, error } = yield call(api.user.forgot, data.user)
    if (response) {
      yield put(user_actions.receiveForgotDone(response))
    } else {
      yield put(user_actions.receiveForgotFail(error))
    }
  } catch (e) {
    yield put(user_actions.receiveForgotFail(e))
  }
}

export function* watchUserForgot() {
  yield takeEvery(user_actions.FORGOT_SEND, userForgot);
}



export function* userReset(data) {
  yield put(user_actions.resetRequest(data.user))
  try {
    const { response, error } = yield call(api.user.reset, data.user)
    if (response) {
      yield put(user_actions.receiveResetDone(response))
    } else {
      yield put(user_actions.receiveResetFail(error))
    }
  } catch (e) {
    yield put(user_actions.receiveResetFail(e))
  }
}

export function* watchUserReset() {
  yield takeEvery(user_actions.RESET_SEND, userReset);
}


export default function* root() {
  yield fork(watchUserLogin)
  yield fork(watchUserLogout)
  yield fork(watchUserForgot)
  yield fork(watchUserReset)
}

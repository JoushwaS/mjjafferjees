import {all, call, put, select} from 'redux-saga/effects';
import {
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from '../types';

function* checkUser(action) {
  console.log('checkUser saga');
  try {
    // const user = yield call(() => { }, action.payload.userId);
    const user = {email: 'a.rehman@sunbonn.com'};
    yield put({type: SIGNUP_SUCCESS, user});
  } catch ({message}) {
    yield put({type: SIGNUP_FAIL, message});
  }
}
function* logoutUser(action) {
  console.log('logoutUser saga', action);
  try {
    // const user = yield call(() => { }, action.payload.userId);
    const tokenremove = false;
    yield put({type: LOGOUT_SUCCESS, tokenremove});
  } catch ({message}) {
    yield put({type: LOGOUT_FAIL, message});
  }
}
export {checkUser, logoutUser};

import {all, takeLatest} from 'redux-saga/effects';
import {SIGNUP, LOGOUT} from '../types';
import {checkUser, logoutUser} from './auth';

// Root Saga
export default function* rootSaga() {
  yield all([takeLatest(SIGNUP, checkUser)]);
  yield all([takeLatest(LOGOUT, logoutUser)]);
}

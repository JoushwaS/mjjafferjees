import {SIGNUP, LOGIN, LOGOUT} from '../types';
import {createAction} from '.';

const userSignUp = payload => {
  console.log('action', payload);
  return {
    type: SIGNUP,
    payload,
  };
  // createAction(SIGNUP, payload);
};
const userLogin = payload => {
  createAction(LOGIN, payload);
};

const userLogout = payload => {
  console.log('action', payload);
  return {
    type: LOGOUT,
    payload,
  };
  // createAction(LOGOUT, payload);
};

export {userSignUp, userLogin, userLogout};

import {
  SET_USER_DATA,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP,
  LOGOUT,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
} from '../types';

const initialState = {
  profileImage: '',
  email: '',
  createdAt: '',
  updatedAt: '',
  username: '',
  password: '',
  isAuthenticated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case SIGNUP:
      return {
        ...state,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        ...action.payload,
      };

    case SIGNUP_FAIL:
      return {
        ...state,
      };
    case LOGOUT:
      return {
        ...state,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        ...action.payload,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};

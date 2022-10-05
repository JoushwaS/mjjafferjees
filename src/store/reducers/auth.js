import {
  SET_USER_DATA,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP,
  LOGOUT,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  GETWISHLIST,
  SAVESHIPPING,
  SETPROFILE,
  SAVESHIPPINGADRESSS,
} from "../types";

const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
  wishlist: [],
  shippingAddress: [],
  shipping: null,
};

export default (state = initialState, action) => {
  // console.log("actionaction", action.payload, action.type);
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
      };
    case SIGNUP:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case SETPROFILE:
      return {
        ...state,
        user: action.payload,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        ...action.payload,
      };

    case SAVESHIPPING:
      return {
        ...state,
        shipping: action.payload,
      };

    case SAVESHIPPINGADRESSS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case GETWISHLIST:
      return {
        ...state,
        wishlist: action.payload,
      };

    case SIGNUP_FAIL:
      return {
        ...state,
      };
    case LOGOUT:
      return {
        user: null,
        isAuthenticated: false,
        token: null,
        shipping: null,
        wishlist: [],
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

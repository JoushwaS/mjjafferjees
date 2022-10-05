import { SIGNUP, LOGIN, LOGOUT, OPENMODAL, SETPROFILE } from "../types";

const userSignUp = (payload) => {
  return {
    type: SIGNUP,
    payload,
  };
};

const saveProfile = (payload) => {
  return {
    type: SETPROFILE,
    payload,
  };
};
const userLogin = (payload) => {};

const userLogout = () => {
  return {
    type: LOGOUT,
  };
};

const opneModal = () => {
  return {
    type: OPENMODAL,
  };
};

export { userSignUp, userLogin, userLogout, opneModal, saveProfile };

import Axios from ".";

export const RegisterUser = (data) => {
  return Axios.post("/api/send_otp", data);
};

export const RegisterNow = (data) => {
  return Axios.post("/api/register  ", data);
};

export const loginUser = (data) => {
  return Axios.post("/api/authlogin", data);
};

export const verifyCode = (data) => {
  return Axios.post("/api/verify_otp", data);
};

export const sendOTP = (data) => {
  return Axios.post("/api/send_otp", data);
};

export const setNewPassword = (data) => {
  return Axios.post("/api/forgetPassword", data);
};

export const updateProfile = (formData) => {
  // console.log("formDataaaa", formData);
  return Axios.post("/api/saveProfile", formData);
};

export const getProfile = (params) => {
  return Axios.get("/api/getProfile", {
    params,
  });
};

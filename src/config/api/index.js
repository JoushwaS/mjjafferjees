import axios from "axios";
import { showToast } from "../../utils/index";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../navigation/root";
import { store } from "../../store";
import { SCREENS } from "../constants/screens";
import { userLogout } from "../../store/actions";
import { hideloader } from "../../store/actions/common";
import { clearCart } from "../../store/actions/cart";
import { baseURL } from "../constants";

var StoredState = store.getState();
console.log("StoredStateStoredStateStoredState", StoredState.auth.token);
const instance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: StoredState.auth.token && `Bearer ${StoredState.auth.token}`,
  },
});

instance.interceptors.request.use(
  (config) => {
    // console.log("REQUEST :", config);
    if (store.getState().auth?.token !== null) {
      let accessToken = store.getState().auth?.token;
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    // console.log("REQUEST FAILURE:", error);
    showToast({
      text: error.message || "Something went wrong",
      type: "error",
    });
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // console.log("RESPONSE :", response?.data);

    return response;
  },
  (error) => {
    // console.log("RESPONSE FAILURE:", error?.response);
    if (error?.response?.data?.status == 403) {
      store.dispatch(hideloader());
      store.dispatch(clearCart());
      store.dispatch(userLogout());
      setTimeout(() => {
        showToast({
          text: error?.response?.data?.message || "Something went wrong",
          type: "error",
        });
      }, 500);
      Navigation.navigate("AuthStack", {
        screen: SCREENS.REGISTER_SCREEN,
        params: {
          cartDetails: null,
        },
      });
    }
    if (error?.response?.status == 422) {
      if (error?.response?.data?.errors?.name) {
        showToast({
          text:
            error?.response?.data?.errors?.name[0] || "Something went wrong",
          type: "error",
        });
      } else if (error?.response?.data?.errors?.email) {
        showToast({
          text:
            error?.response?.data?.errors?.email[0] || "Something went wrong",
          type: "error",
        });
      } else if (error?.response?.data?.errors?.phone) {
        showToast({
          text:
            error?.response?.data?.errors?.phone[0] || "Something went wrong",
          type: "error",
        });
      } else if (error?.response?.data?.errors?.message) {
        showToast({
          text:
            error?.response?.data?.errors?.message[0] || "Something went wrong",
          type: "error",
        });
      } else {
        showToast({
          text: error.message || "Something went wrong",
          type: "error",
        });
      }
    } else {
      console.log("last else in axios", error.response);
      // showToast({
      //   text: error.message || "Something went wrong",
      //   type: "error",
      // });
      // store.dispatch(userLogout());
    }
    return Promise.reject(error);
  }
);

export default instance;

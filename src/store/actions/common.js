import axios from "axios";
import { showToast } from "../../utils";
import {
  SHOWLOADER,
  HIDELOADER,
  GET_COLORS,
  GET_COUNTRIES,
  GET_CITIES,
  GETWISHLIST,
  SET_CURRENCY,
} from "../types";

const showloader = () => {
  return {
    type: SHOWLOADER,
  };
};

const hideloader = () => {
  return {
    type: HIDELOADER,
  };
};
const getColors = (payload) => {
  return {
    type: GET_COLORS,
    payload: payload,
  };
};

const getCountries = (payload) => {
  return {
    type: GET_COUNTRIES,
    payload: payload,
  };
};

const getCities = (payload) => {
  return {
    type: GET_CITIES,
    payload: payload,
  };
};

const getWishlistProducts = (payload) => {
  return {
    type: GETWISHLIST,
    payload: payload,
  };
};

const getCurrenctRates = (currency) => async (dispatch) => {
  try {
    const response = await axios({
      method: "GET",
      url: `https://api.apilayer.com/exchangerates_data/convert?to=${currency}&from=PKR&amount=1`,
      headers: {
        apikey: "dtBVqtXCnIAO7lqWc9mgHHCLeXuOAcEF",
      },
    });
    console.log("response", response.data?.info?.rate);
    dispatch(setCurrencyData(currency, response.data?.info?.rate));
  } catch (error) {
    console.log("error", error.response);
    showToast({
      type: "error",
      text: "Failed to fetch conversion rates" || error.message,
    });
  }
};

const setCurrencyData = (currency, conversionRate) => {
  return {
    type: SET_CURRENCY,
    currency,
    conversionRate,
  };
};

export {
  showloader,
  hideloader,
  getColors,
  getCountries,
  getCities,
  getWishlistProducts,
  setCurrencyData,
  getCurrenctRates,
};

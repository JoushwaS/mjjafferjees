import {
  SHOWLOADER,
  HIDELOADER,
  GET_COLORS,
  GET_COUNTRIES,
  GET_CITIES,
  SET_CURRENCY,
} from "../types";

const initialState = {
  loading: false,
  colors: [],
  countries: [],
  cities: [],
  currency: "PKR",
  conversionRate: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENCY:
      return {
        ...state,
        currency: action.currency,
        conversionRate: action.conversionRate,
      };
    case SHOWLOADER:
      return {
        ...state,
        loading: true,
      };
    case GET_COLORS:
      return {
        ...state,
        colors: action.payload,
      };
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };
    case GET_CITIES:
      return {
        ...state,
        cities: action.payload,
      };
    case HIDELOADER:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

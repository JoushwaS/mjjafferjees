import { OPENMODAL, GETCATEGORIES, GETSUBCATEGORIES } from "../types";

const initialState = {
  openModal: false,
  banners: [],
  categories: [],
  subcategories: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OPENMODAL:
      return {
        ...state,
        openModal: true,
      };

    case GETCATEGORIES:
      return {
        ...state,
        banners: action.payload.banners,
        categories: action.payload.category,
      };

    case GETSUBCATEGORIES:
      return {
        ...state,
        subcategories: action.payload,
      };

    default:
      return state;
  }
};

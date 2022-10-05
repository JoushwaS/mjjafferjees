import { GETCATEGORIES, GETSUBCATEGORIES } from "../types";

const getHome = (payload) => {
  return {
    type: GETCATEGORIES,
    payload,
  };
};

const getSubcategories = (payload) => {
  return {
    type: GETSUBCATEGORIES,
    payload: payload?.subcategory,
  };
};

export { getHome, getSubcategories };

import { combineReducers } from "redux";
import auth from "./auth";
import category from "./category";
import cart from "./cart";
import common from "./common";

// combine all reducers
const rootReducer = combineReducers({
  auth,
  category,
  common,
  cart,
});

export default rootReducer;

import { createStore, applyMiddleware } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import logger from "redux-logger";
import rootReducer from "./reducers";
import reduxthunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";

// create redux-saga middleware

// redux-persist config
const persistConfig = {
  key: "root:todoapp",
  storage: AsyncStorage,
};

// initialize persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Define redux middlewares
const middlewares = [reduxthunk];

// store for Provider component
export const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares)
);

// persist store for PersistGate component
export const persistor = persistStore(store);

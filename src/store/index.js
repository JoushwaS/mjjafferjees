import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistReducer, persistStore } from 'redux-persist';
import logger from 'redux-logger';
import rootReducer from './reducers';
import rootSaga from './sagas';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create redux-saga middleware
const sagaMiddleware = createSagaMiddleware();

// redux-persist config
const persistConfig = {
	key: 'root:todoapp',
	storage: AsyncStorage,
	whitelist: ['auth', 'todos'],
};


// initialize persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Define redux middlewares
const middlewares = [sagaMiddleware, logger];

// store for Provider component
const store = createStore(persistedReducer, applyMiddleware(...middlewares));

// persist store for PersistGate component
const persistor = persistStore(store);

// Run Saga Middleware
sagaMiddleware.run(rootSaga);

export { store, persistor };

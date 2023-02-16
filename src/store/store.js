// import {
// 	compose,
// 	legacy_createStore as createStore,
// 	applyMiddleware,
// } from 'redux';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './root-reducer';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './root-saga';

import { configureStore } from '@reduxjs/toolkit';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
	process.env.NODE_ENV !== 'production' && logger,
	sagaMiddleware,
].filter(Boolean);

// const composeEnhander =
// 	(process.env.NODE_ENV !== 'production' &&
// 		window &&
// 		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
// 	compose;

// const composedEnhancers = composeEnhander(applyMiddleware(...middleWares));

// // root reducer

export const store = configureStore({
	reducer: persistedReducer,
	middleware: middleWares,
});

// export const store = createStore(
// 	persistedReducer,
// 	undefined,
// 	composedEnhancers
// );

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

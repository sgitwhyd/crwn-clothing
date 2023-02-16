// import {
// 	compose,
// 	legacy_createStore as createStore,
// 	applyMiddleware,
// } from 'redux';
import logger from 'redux-logger';
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import { rootReducer } from './root-reducer';
// import thunk from 'redux-thunk';

import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

// const persistConfig = {
// 	key: 'root',
// 	storage,
// 	whitelist: ['cart'],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
	process.env.NODE_ENV !== 'production' && logger,
	thunk,
].filter(Boolean);

// const composeEnhander =
// 	(process.env.NODE_ENV !== 'production' &&
// 		window &&
// 		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
// 	compose;

// const composedEnhancers = composeEnhander(applyMiddleware(...middleWares));

// // root reducer

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(middleWares),
});

// export const store = createStore(
// 	persistedReducer,
// 	undefined,
// 	composedEnhancers
// );

// export const persistor = persistStore(store);

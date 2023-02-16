import { createSlice } from '@reduxjs/toolkit';
import { signInWithEmail, signUp } from './user.saga';

const INITIAL_STATE = {
	currentUser: null,
	isLoading: false,
	error: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState: INITIAL_STATE,
	reducers: {
		signInSuccess(state, action) {
			state.currentUser = action.payload;
		},
		signOutSuccess(state, action) {
			state.currentUser = null;
		},
		signUpSuccess(state, action) {
			state.currentUser = action.payload;
		},
		signOutFailed(state, action) {
			state.error = action.payload;
		},
		signInFailed(state, action) {
			state.error = action.payload;
		},
		signUpStart(state, action) {
			signUp(action.payload);
		},
		signUpfailed(state, action) {
			state.error = action.payload;
		},
		signOutStart(state, action) {},
		googleSignInStart(state, action) {},
		emailSignInStart(state, action) {
			state.currentUser = signInWithEmail(action.payload);
		},
		checkUserSession(state, action) {
			state.currentUser = action.payload;
		},
	},
});

export const {
	signInFailed,
	signInSuccess,
	signOutFailed,
	signOutSuccess,
	signUpfailed,
	signUpSuccess,
	googleSignInStart,
	checkUserSession,
	emailSignInStart,
	signOutStart,
	signUpStart,
} = userSlice.actions;
export const userReducer = userSlice.reducer;

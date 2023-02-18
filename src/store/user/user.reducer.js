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
			state.error = null;
		},
		signOutSuccess(state, action) {
			state.currentUser = null;
		},
		signUpSuccess(state, action) {},
		signOutFailed(state, action) {
			state.error = action.payload;
		},
		signInFailed(state, action) {
			state.error = action.payload;
		},
		signUpStart(state, action) {
			signUp(action.payload);
		},
		signUpFailed(state, action) {
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
	signUpFailed,
	signUpSuccess,
	googleSignInStart,
	checkUserSession,
	emailSignInStart,
	signOutStart,
	signUpStart,
} = userSlice.actions;
export const userReducer = userSlice.reducer;

import { UserData } from "../../utils/firebase/firebase.utils";
import { AnyAction } from "redux";
import {
	signInSuccess,
	signOutSuccess,
	signInFailed,
	signOutFailed,
	signUpfailed,
} from "./user.action";

export type UserStates = {
	readonly currentUser: UserData | null;
	readonly isLoading: boolean;
	readonly error: null | any;
};

const USER_INITAL_STATE: UserStates = {
	currentUser: null,
	isLoading: false,
	error: null,
};

export const userReducer = (state = USER_INITAL_STATE, action: AnyAction) => {
	const { payload } = action;

	if (signInSuccess.match(action)) {
		return {
			...state,
			currentUser: payload,
		};
	}

	if (signOutSuccess.match(action)) {
		return {
			...state,
			currentUser: null,
		};
	}

	if (
		signInFailed.match(action) ||
		signOutFailed.match(action) ||
		signUpfailed.match(action)
	) {
		return {
			...state,
			error: payload,
		};
	}

	return state;
};

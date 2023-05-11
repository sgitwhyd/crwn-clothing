import { USER_ACTION_TYPE } from "./user.types";
import { User } from "firebase/auth";
import {
	Action,
	createAction,
	withMatcher,
	ActionWithPayload,
} from "../../utils/reducers/reducer.utils";
import {
	UserData,
	AdditionalInformation,
} from "../../utils/firebase/firebase.utils";

export type CheckUserSession = Action<USER_ACTION_TYPE.CHECK_USER_SESSION>;
export type GoogleSignInStart = Action<USER_ACTION_TYPE.GOOGLE_SIGN_IN_START>;
export type SetCurrentUser = ActionWithPayload<
	USER_ACTION_TYPE.SET_CURRENT_USER,
	UserData
>;
export type EmailSignInStart = ActionWithPayload<
	USER_ACTION_TYPE.EMAIL_SIGN_IN_START,
	{
		email: string;
		password: string;
	}
>;

export type SignUpStart = ActionWithPayload<
	USER_ACTION_TYPE.SIGN_UP_START,
	{
		email: string;
		displayName: string;
		password: string;
	}
>;
export type SignInSuccess = ActionWithPayload<
	USER_ACTION_TYPE.SIGN_IN_SUCCESS,
	UserData
>;

export type SignOutFailed = ActionWithPayload<
	USER_ACTION_TYPE.SIGN_OUT_FAILED,
	Error
>;

export type SignUpSuccess = ActionWithPayload<
	USER_ACTION_TYPE.SIGN_UP_SUCCESS,
	{
		user: User;
		additionalDetails: AdditionalInformation;
	}
>;

export type SignUpFailed = ActionWithPayload<
	USER_ACTION_TYPE.SIGN_UP_FAILED,
	Error
>;

export const setCurrentUser = withMatcher((user: UserData): SetCurrentUser => {
	return createAction(USER_ACTION_TYPE.SET_CURRENT_USER, user);
});

export const checkUserSession = withMatcher(
	(): CheckUserSession => createAction(USER_ACTION_TYPE.CHECK_USER_SESSION)
);

export const googleSignInStart = withMatcher(
	(): GoogleSignInStart => createAction(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START)
);

export const emailSignInStart = withMatcher(
	(email: string, password: string): EmailSignInStart =>
		createAction(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, {
			email,
			password,
		})
);

export const signInSuccess = withMatcher(
	(
		user: UserData & {
			id: string;
		}
	): SignInSuccess => createAction(USER_ACTION_TYPE.SIGN_IN_SUCCESS, user)
);

export const signInFailed = withMatcher((error: Error) =>
	createAction(USER_ACTION_TYPE.SIGN_IN_FAILED, error)
);

export const signUpStart = withMatcher(
	(email: string, displayName: string, password: string): SignUpStart =>
		createAction(USER_ACTION_TYPE.SIGN_UP_START, {
			email,
			displayName,
			password,
		})
);

export const signUpSuccess = withMatcher(
	(user: User, additionalDetails: AdditionalInformation): SignUpSuccess =>
		createAction(USER_ACTION_TYPE.SIGN_UP_SUCCESS, {
			user,
			additionalDetails,
		})
);

export const signUpfailed = withMatcher(
	(error: Error): SignUpFailed =>
		createAction(USER_ACTION_TYPE.SIGN_UP_FAILED, error)
);

export const signOutStart = withMatcher(() =>
	createAction(USER_ACTION_TYPE.SIGN_OUT_START)
);

export const signOutSuccess = withMatcher(() =>
	createAction(USER_ACTION_TYPE.SIGN_OUT_SUCCESS)
);

export const signOutFailed = withMatcher(
	(error: Error): SignOutFailed =>
		createAction(USER_ACTION_TYPE.SIGN_OUT_FAILED, error)
);

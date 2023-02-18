import { takeLatest, put, all, call } from 'redux-saga/effects';

import {
	signInSuccess,
	signInFailed,
	signUpSuccess,
	signUpFailed,
	signOutSuccess,
	signOutFailed,
	checkUserSession,
	googleSignInStart,
	emailSignInStart,
	signOutStart,
	signUpStart,
} from './user.reducer';

import {
	getCurrentUser,
	createUserDocumentFromAuth,
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
	createAuthUserWithEmailAndPassword,
	signOutUser,
} from '../../utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
	try {
		const userSnapshot = yield call(
			createUserDocumentFromAuth,
			userAuth,
			additionalDetails
		);
		yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* signInWithGoogle() {
	try {
		const { user } = yield call(signInWithGooglePopup);
		yield call(getSnapshotFromUserAuth, user);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* signInWithEmail({ payload }) {
	const { email, password } = payload;
	try {
		const { user } = yield call(
			signInAuthUserWithEmailAndPassword,
			email,
			password
		);
		yield call(getSnapshotFromUserAuth, user);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield call(getCurrentUser);
		if (!userAuth) return;
		yield call(getSnapshotFromUserAuth, userAuth);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* signUp({ payload }) {
	const { email, password, displayName } = payload;
	try {
		const { user } = yield call(
			createAuthUserWithEmailAndPassword,
			email,
			password
		);

		const signUpPayload = {
			user,
			additionalDetails: {
				displayName,
			},
		};

		yield put(signUpSuccess(signUpPayload));
	} catch (error) {
		yield put(signUpFailed(error));
	}
}

export function* signOut() {
	try {
		yield call(signOutUser);
		yield put(signOutSuccess());
	} catch (error) {
		yield put(signOutFailed(error));
	}
}

export function* signInAfterSignUp({ payload }) {
	const { user, additionalDetails } = payload;
	yield call(getSnapshotFromUserAuth, user, additionalDetails);
	yield put();
}

export function* onGoogleSignInStart() {
	yield takeLatest(googleSignInStart, signInWithGoogle);
}

export function* onCheckUserSession() {
	yield takeLatest(checkUserSession, isUserAuthenticated);
}

export function* onEmailSignInStart() {
	yield takeLatest(emailSignInStart, signInWithEmail);
}

export function* onSignUpStart() {
	yield takeLatest(signUpStart, signUp);
}

export function* onSignUpSuccess() {
	yield takeLatest(signUpSuccess, signInAfterSignUp);
}

export function* onSignOutStart() {
	yield takeLatest(signOutStart, signOut);
}

export function* userSaga() {
	yield all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
		call(onSignOutStart),
	]);
}

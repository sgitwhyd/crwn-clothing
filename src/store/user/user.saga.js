import { takeLatest, all, put, call } from 'redux-saga/effects';

import {
	signInSuccess,
	signInFailed,
	signUpfailed,
	signOutFailed,
	signOutSuccess,
	signUpSuccess,
	googleSignInStart,
	checkUserSession,
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

		yield put(
			signInSuccess({
				id: userSnapshot.id,
				...userSnapshot.data(),
			})
		);
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

export function* signInWithGoogle() {
	try {
		const { user } = yield call(signInWithGooglePopup);
		yield call(getSnapshotFromUserAuth, user);
	} catch (error) {
		yield put(signUpfailed(error));
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

export function* signUp({ payload }) {
	const { email, password, displayName } = payload;
	try {
		const { user } = yield call(
			createAuthUserWithEmailAndPassword,
			email,
			password
		);
		yield put(signUpSuccess(user, { displayName }));
		yield call(signUpSuccess);
	} catch (error) {
		yield put(signUpfailed(error));
	}
}

export function* signInAfterSignUp({ payload }) {
	const { user, additionalDetails } = payload;
	yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onSignUpSuccess() {
	yield takeLatest(signUpSuccess, signInAfterSignUp);
}

export function* onSignUpStart() {
	yield takeLatest(signUpStart, signUp);
}

export function* onEmailSignInStart() {
	yield takeLatest(emailSignInStart, signInWithEmail);
}

export function* onSignOutStart() {
	yield takeLatest(signOutStart, signOut);
}

export function* onGoogleSignInStart() {
	yield takeLatest(googleSignInStart, signInWithGoogle);
}

export function* onCheckUserSession() {
	yield takeLatest(checkUserSession, isUserAuthenticated);
}

export function* userSaga() {
	yield all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onSignOutStart),
		call(onSignUpStart),
		call(onEmailSignInStart),
		call(onSignUpSuccess),
	]);
}

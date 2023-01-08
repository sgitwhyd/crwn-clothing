import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyA_LTdFGAHX-AQeTU9J-UbRQPHvaGhqfXw',
	authDomain: 'crwn-cloth-db-43985.firebaseapp.com',
	projectId: 'crwn-cloth-db-43985',
	storageBucket: 'crwn-cloth-db-43985.appspot.com',
	messagingSenderId: '1095825368870',
	appId: '1:1095825368870:web:60298b0d5ae847eb7143e7',
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.getCustomParameters({
	prompt: 'select_account',
});

// sign in with oauth google
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// setup firebase database
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
	userAuth,
	additionInformation = {}
) => {
	if (!userAuth) return;

	const userDocRef = doc(db, 'users', 'userAuth.uid');
	const userDocSnapshot = await getDoc(userDocRef);

	// check if users exists in database
	if (!userDocSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionInformation,
			});
		} catch (error) {
			console.log(error);
		}
	}

	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

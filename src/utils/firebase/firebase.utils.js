import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	writeBatch,
	collection,
	query,
	getDocs,
} from 'firebase/firestore';

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

export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	try {
		objectsToAdd.forEach((object) => {
			const docRef = doc(collectionRef, object.title.toLowerCase());
			batch.set(docRef, object);
		});

		await batch.commit();
		console.log('done');
	} catch (error) {
		console.log(error);
	}
};

export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, 'categories');
	const q = query(collectionRef);

	const querySnapShot = await getDocs(q);
	return querySnapShot.docs.map((doc) => doc.data());
};

export const createUserDocumentFromAuth = async (
	userAuth,
	additionInformation = {}
) => {
	if (!userAuth) return;

	const userDocRef = doc(db, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	// check if users exists in database
	if (!userSnapshot.exists()) {
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

	return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
	return await signOut(auth);
};

export const onAuthStateChangedListener = (callback) =>
	onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscibe = onAuthStateChanged(
			auth,
			(userAuth) => {
				unsubscibe();
				resolve(userAuth);
			},
			reject
		);
	});
};

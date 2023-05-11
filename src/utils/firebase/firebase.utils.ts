import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	User,
	NextOrObserver,
} from "firebase/auth";
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	writeBatch,
	collection,
	query,
	getDocs,
	QueryDocumentSnapshot,
} from "firebase/firestore";

import { Category } from "../../store/categories/category.types";

const firebaseConfig = {
	apiKey: "AIzaSyA_LTdFGAHX-AQeTU9J-UbRQPHvaGhqfXw",
	authDomain: "crwn-cloth-db-43985.firebaseapp.com",
	projectId: "crwn-cloth-db-43985",
	storageBucket: "crwn-cloth-db-43985.appspot.com",
	messagingSenderId: "1095825368870",
	appId: "1:1095825368870:web:60298b0d5ae847eb7143e7",
};

export const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account",
});

// sign in with oauth google
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// setup firebase database
export const db = getFirestore();

export type ObjectsToAdd = {
	title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectsToAdd>(
	collectionKey: string,
	objectsToAdd: T[]
): Promise<void> => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
	console.log("done");
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
	const collectionRef = collection(db, "categories");
	const q = query(collectionRef);

	const querySnapShot = await getDocs(q);
	return querySnapShot.docs.map((doc) => doc.data() as Category);
};

export type AdditionalInformation = {
	displayName?: string;
};

export type UserData = {
	displayName: string;
	email: string;
	createdAt: Date;
};

export const createUserDocumentFromAuth = async (
	userAuth: User,
	additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
	if (!userAuth) return;

	const userDocRef = doc(db, "users", userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	// check if users exists in database
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			});
		} catch (error) {
			console.log(error);
		}
	}

	return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
	return await signOut(auth);
};

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
	onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
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

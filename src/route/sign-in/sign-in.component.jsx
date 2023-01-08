import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
	const handleGoogleSignIn = async () => {
		const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentFromAuth(user);
	};

	return (
		<div>
			SignIn
			<button onClick={handleGoogleSignIn}>Sign in with google</button>
			<SignUpForm />
		</div>
	);
};

export default SignIn;

import { useState } from 'react';
import {
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles.jsx';

const defaultFormFields = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await signInAuthUserWithEmailAndPassword(email, password);

			setFormFields(defaultFormFields);
		} catch (error) {
			switch (error.code) {
				case 'auth/user-not-found':
					alert('User not found');
					break;
				case 'auth/wrong-password':
					alert('Wrong password');
					break;
				default:
			}
		}
	};

	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<SignInContainer>
			<h2>Already have an account ?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label={'Email'}
					type='email'
					required
					onChange={handleChange}
					name='email'
					value={email}
				/>
				<FormInput
					label={'Password'}
					type='password'
					required
					onChange={handleChange}
					name='password'
					value={password}
				/>

				<ButtonsContainer>
					<Button type='submit'>Sign In</Button>
					<Button
						buttonType={BUTTON_TYPE_CLASSES.google}
						onClick={signInWithGoogle}>
						Google Sign In
					</Button>
				</ButtonsContainer>
			</form>
		</SignInContainer>
	);
};

export default SignInForm;

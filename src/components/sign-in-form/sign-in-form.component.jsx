import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles.jsx';
import { useDispatch } from 'react-redux';
import {
	googleSignInStart,
	emailSignInStart,
} from '../../store/user/user.action';

const defaultFormFields = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const dispatch = useDispatch();
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			dispatch(emailSignInStart(email, password));

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
		dispatch(googleSignInStart());
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

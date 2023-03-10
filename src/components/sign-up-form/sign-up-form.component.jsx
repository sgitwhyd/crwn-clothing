import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { SignUpContainer } from './sign-up-form.styles.jsx';

import { useDispatch } from 'react-redux';
import { signUpStart } from '../../store/user/user.reducer';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const SignUpForm = () => {
	const dispatch = useDispatch();
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}

		try {
			dispatch(signUpStart({ email, displayName, password }));
			setFormFields(defaultFormFields);
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				alert('Email already in use');
			} else {
				console.log(error);
			}
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<SignUpContainer>
			<h2>Don;t have an account ?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label={'Display Name'}
					type='text'
					required
					name='displayName'
					value={displayName}
					onChange={handleChange}
				/>
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

				<FormInput
					label={'Confirm Password'}
					type='password'
					required
					onChange={handleChange}
					name='confirmPassword'
					value={confirmPassword}
				/>
				<Button type='submit'>Sign Up</Button>
			</form>
		</SignUpContainer>
	);
};

export default SignUpForm;

import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setCurrentUser } from './store/user/user.reducer';

import {
	onAuthStateChangedListener,
	createUserDocumentFromAuth,
} from './utils/firebase/firebase.utils';

import Home from './route/home/home.component';
import Navigation from './route/navigation/navigation.component';
import Authentication from './route/authentication/authentication.component';
import Shop from './route/shop/shop.component';
import Checkout from './route/checkout/checkout.component';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribeFromAuth = onAuthStateChangedListener((user) => {
			if (user) {
				createUserDocumentFromAuth(user);
			}

			const pickedUser =
				user && (({ accessToken, email }) => ({ accessToken, email }))(user);

			dispatch(setCurrentUser(pickedUser));
		});

		return unsubscribeFromAuth;
	}, []);

	return (
		<Routes>
			<Route path='/' element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path='shop/*' element={<Shop />} />
				<Route path='auth' element={<Authentication />} />
				<Route path='checkout' element={<Checkout />} />
			</Route>
		</Routes>
	);
};

export default App;

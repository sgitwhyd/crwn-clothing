import { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { checkUserSession } from "./store/user/user.action";

import Spinner from "./components/spinner/spinner.component";
const Home = lazy(() => import("./route/home/home.component"));
const Shop = lazy(() => import("./route/shop/shop.component"));
const Checkout = lazy(() => import("./route/checkout/checkout.component"));
const Navigation = lazy(() =>
	import("./route/navigation/navigation.component")
);
const Authentication = lazy(() =>
	import("./route/authentication/authentication.component")
);

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkUserSession());
	});

	return (
		<Suspense fallback={<Spinner />}>
			<Routes>
				<Route path='/' element={<Navigation />}>
					<Route index element={<Home />} />
					<Route path='shop/*' element={<Shop />} />
					<Route path='auth' element={<Authentication />} />
					<Route path='checkout' element={<Checkout />} />
				</Route>
			</Routes>
		</Suspense>
	);
};

export default App;

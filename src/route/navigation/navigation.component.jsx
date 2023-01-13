import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import { signOutAuthUser } from '../../utils/firebase/firebase.utils';

import {
	NavigationContainer,
	LogoContainer,
	NavLinks,
	NavLink,
} from './navigation.styles.jsx';

const Navigation = () => {
	const { currentUser } = useContext(UserContext);
	const { isCartOpen } = useContext(CartContext);

	return (
		<>
			<NavigationContainer>
				<LogoContainer to={'/'}>
					<CrwnLogo className='logo' />
				</LogoContainer>
				<NavLinks>
					<NavLink to={'/shop'}>SHOP</NavLink>
					{currentUser ? (
						<NavLink as='span' onClick={signOutAuthUser}>
							SIGN OUT
						</NavLink>
					) : (
						<NavLink to={'/auth'}>SIGN IN</NavLink>
					)}
					<CartIcon />
				</NavLinks>
				{isCartOpen && <CartDropDown />}
			</NavigationContainer>
			<Outlet />
		</>
	);
};

export default Navigation;

import { useDispatch, useSelector } from 'react-redux';

import { setIsCartOpen } from '../../store/cart/cart.reducer';
import {
	selectCartCount,
	selectIsCartOpen,
} from '../../store/cart/cart.selector';

import {
	ShoppingIcon,
	CartIconContainer,
	ItemCount,
} from './cart-icon.styles.jsx';

const CartIcon = () => {
	const dispatch = useDispatch();

	const cartIsOpen = useSelector(selectIsCartOpen);
	const cartCount = useSelector(selectCartCount);
	const toggleCartOpen = () => dispatch(setIsCartOpen(!cartIsOpen));

	return (
		<CartIconContainer onClick={toggleCartOpen}>
			<ShoppingIcon />
			<ItemCount>{cartCount}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;

import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import {
	ShoppingIcon,
	CartIconContainer,
	ItemCount,
} from './cart-icon.styles.jsx';

const CartIcon = () => {
	const { setIsCartOpen, cartCount } = useContext(CartContext);

	return (
		<CartIconContainer onClick={setIsCartOpen}>
			<ShoppingIcon />
			<ItemCount>{cartCount}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;

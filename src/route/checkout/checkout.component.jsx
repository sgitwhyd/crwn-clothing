import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import {
	CheckoutContainer,
	CheckoutHeader,
	HeaderBlock,
	Total,
} from './checkout.styles';

const Checkout = () => {
	const { cartItems, totalCart } = useContext(CartContext);

	return (
		<CheckoutContainer>
			<CheckoutHeader>
				<HeaderBlock>
					<span>Product</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Description</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Quantity</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Price</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>remove</span>
				</HeaderBlock>
			</CheckoutHeader>
			{cartItems.map((item) => (
				<CheckoutItem key={item.id} cartItem={item} />
			))}
			<Total>total : ${totalCart}</Total>
		</CheckoutContainer>
	);
};

export default Checkout;

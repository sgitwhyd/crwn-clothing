import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import PaymentForm from '../../components/payment-form/payment-form.component';

import {
	CheckoutContainer,
	CheckoutHeader,
	HeaderBlock,
	Total,
} from './checkout.styles';
import { useSelector } from 'react-redux';
import {
	selectCartItems,
	selectTotalCart,
} from '../../store/cart/cart.selector';

const Checkout = () => {
	const cartItems = useSelector(selectCartItems);
	const totalCart = useSelector(selectTotalCart);

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
			<PaymentForm />
		</CheckoutContainer>
	);
};

export default Checkout;

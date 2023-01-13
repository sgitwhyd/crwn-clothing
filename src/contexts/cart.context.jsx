import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
	// Check if product is already in cart

	const productIsExist = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);

	// If it is, increase quantity by 1

	if (productIsExist) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	// if not, add it to the cart with quantity 1

	return [
		...cartItems,
		{
			...productToAdd,
			quantity: 1,
		},
	];
};

const clearItemFromCart = (cartItems, productToRemove) => {
	const productIsExist = cartItems.find(
		(item) => item.id === productToRemove.id
	);

	if (productIsExist.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
	}

	if (productIsExist) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToRemove.id
				? {
						...cartItem,
						quantity: cartItem.quantity - 1,
				  }
				: cartItem
		);
	}
};

const removeProductInCart = (cartItems, productToRemove) => {
	return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};

export const CartContext = createContext({
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	totalCart: 0,
	setIsCartOpen: () => {},
	addItemToCart: () => {},
	removeItemCart: () => {},
	clearItemCart: () => {},
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [totalCart, setTotalCart] = useState(0);

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};

	const removeItemCart = (productToRemove) => {
		setCartItems(clearItemFromCart(cartItems, productToRemove));
	};

	const clearItemCart = (productToRemove) => {
		setCartItems(removeProductInCart(cartItems, productToRemove));
	};

	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);
		const newtotalCart = cartItems.reduce(
			(total, cartItem) => total + cartItem.price * cartItem.quantity,
			0
		);

		setTotalCart(newtotalCart);
		setCartCount(newCartCount);
	}, [cartItems]);

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		cartItems,
		cartCount,
		removeItemCart,
		totalCart,
		clearItemCart,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

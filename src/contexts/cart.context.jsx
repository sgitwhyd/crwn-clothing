import { createContext, useReducer } from 'react';

import { createAction } from '../utils/reducers/reducer.utils';

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

const CART_ACTION_TYPE = {
	SET_CART_ITEMS: 'SET_CART_ITEMS',
	SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const cartReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPE.SET_CART_ITEMS:
			return {
				...state,
				...payload,
			};
		case CART_ACTION_TYPE.SET_IS_CART_OPEN:
			return {
				...state,
				isCartOpen: !state.isCartOpen,
			};
		default:
			break;
	}
};

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	totalCart: 0,
};

export const CartProvider = ({ children }) => {
	const [{ cartItems, cartCount, totalCart, isCartOpen }, dispatch] =
		useReducer(cartReducer, INITIAL_STATE);

	const setIsCartOpen = () => {
		dispatch(createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN));
	};

	const updateCartItemsReducers = (newCartItems) => {
		const newCartCount = newCartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);
		const newtotalCart = newCartItems.reduce(
			(total, cartItem) => total + cartItem.price * cartItem.quantity,
			0
		);

		dispatch(
			createAction(CART_ACTION_TYPE.SET_CART_ITEMS, {
				cartItems: newCartItems,
				cartTotal: newtotalCart,
				cartCount: newCartCount,
			})
		);
	};

	const addItemToCart = (productToAdd) => {
		const newCartItems = addCartItem(cartItems, productToAdd);
		updateCartItemsReducers(newCartItems);
	};

	const removeItemCart = (productToRemove) => {
		const newCartItems = clearItemFromCart(cartItems, productToRemove);
		updateCartItemsReducers(newCartItems);
	};

	const clearItemCart = (productToRemove) => {
		const newCartItems = removeProductInCart(cartItems, productToRemove);
		updateCartItemsReducers(newCartItems);
	};

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

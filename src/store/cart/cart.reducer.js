import { createSlice } from '@reduxjs/toolkit';

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

const removeCartItems = (cartItems, productToRemove) => {
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

const clearCartItems = (cartItems, productToRemove) => {
	return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState: INITIAL_STATE,
	reducers: {
		setIsCartOpen(state, action) {
			state.isCartOpen = action.payload;
		},
		addItemToCart(state, action) {
			state.cartItems = addCartItem(state.cartItems, action.payload);
		},
		removeItemCart(state, action) {
			state.cartItems = removeCartItems(state.cartItems, action.payload);
		},
		clearItemCart(state, action) {
			state.cartItems = clearCartItems(state.cartItems, action.payload);
		},
	},
});

export const { setIsCartOpen, addItemToCart, clearItemCart, removeItemCart } =
	cartSlice.actions;
export const cartReducer = cartSlice.reducer;

// With these three actions, we're defining how three parts of our state will be maintained and updated
export const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS'; // is used by ProductList component
export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES'; // works a lot like update_products
export const UPDATE_CURRENT_CATEGORY = 'UPDATE_CURRENT_CATEGORY';

// These statements represent all of the actions you might want to perform with a shopping cart, from adding a single item to adding multiple items at once.
export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_MULTIPLE_TO_CART = 'ADD_MULTIPLE_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';
export const TOGGLE_CART = 'TOGGLE_CART';

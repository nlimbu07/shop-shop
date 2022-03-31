// import our actions
import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART,
} from '../utils/actions.js';

import { reducer } from '../utils/reducers.js';

// create a sample of what our global state will look like
const initialState = {
  products: [],
  categories: [{ name: 'Food' }],
  currentCategory: '1',
  cart: [
    {
      _id: '1',
      name: 'Soup',
      purchaseQuantity: 1,
    },
    {
      _id: '2',
      name: 'Bread',
      purchaseQuantity: 2,
    },
  ],
  cartOpen: false,
};

// testing the UPDATE_PRODUCTS action to see if we can add a product to the products array or create a new state object
test('UPDATE_PRODUCTS', () => {
  let newState = reducer(initialState, {
    type: UPDATE_PRODUCTS,
    products: [{}, {}],
  });

  // help us confirm that we successfully added our products to the newState and didn't affect initialState in any way, shape, or form.
  expect(newState.products.length).toBe(2);
  expect(initialState.products.length).toBe(0);
});

// execute the UPDATE_CATEGORIES action and update our category list to be a new array of categories.
test('UPDATE_CATEGORIES', () => {
  let newState = reducer(initialState, {
    type: UPDATE_CATEGORIES,
    categories: [{}, {}],
  });

  expect(newState.categories.length).toBe(2);
  expect(initialState.categories.length).toBe(1);
});

// With this test, we are updating the state of currentCategory to a new string value instead of an array.
// When the test runs, compare these values between newState and initialState to confirm that initialState has remained the same.
test('UPDATE_CURRENT_CATEGORY', () => {
  let newState = reducer(initialState, {
    type: UPDATE_CURRENT_CATEGORY,
    currentCategory: '2',
  });

  expect(newState.currentCategory).toBe('2');
  expect(initialState.currentCategory).toBe('1');
});

test('ADD_TO_CART', () => {
  let newState = reducer(initialState, {
    type: ADD_TO_CART,
    product: { purchaseQuantity: 1 },
  });

  expect(newState.cart.length).toBe(3);
  expect(initialState.cart.length).toBe(2);
});

test('ADD_MULTIPLE_TO_CART', () => {
  let newState = reducer(initialState, {
    type: ADD_MULTIPLE_TO_CART,
    products: [{}, {}],
  });

  expect(newState.cart.length).toBe(4);
  expect(initialState.cart.length).toBe(2);
});

// This test will remove both cart items from initialState, one after the other. We want to test the removal of both because removing the last item 
// from the cart should also close it (i.e., set cartOpen to false).
test('REMOVE_FROM_CART', () => {
  let newState1 = reducer(initialState, {
    type: REMOVE_FROM_CART,
    _id: '1',
  });

  // cart is still open
  expect(newState1.cartOpen).toBe(true);

  // the second item should now be the first
  expect(newState1.cart.length).toBe(1);
  expect(newState1.cart[0]._id).toBe('2');

  let newState2 = reducer(newState1, {
    type: REMOVE_FROM_CART,
    _id: '2',
  });

  // cart is empty and closed
  expect(newState2.cartOpen).toBe(false);
  expect(newState2.cart.length).toBe(0);

  expect(initialState.cart.length).toBe(2);
});

// In this test, we want to ensure that only the first item's quantity is updated, because its _id matches
// the _id given to the reducer() function. The second item's purchaseQuantity should remain at 2.
test('UPDATE_CART_QUANTITY', () => {
  let newState = reducer(initialState, {
    type: UPDATE_CART_QUANTITY,
    _id: '1',
    purchaseQuantity: 3,
  });

  expect(newState.cartOpen).toBe(true);
  expect(newState.cart[0].purchaseQuantity).toBe(3);
  expect(newState.cart[1].purchaseQuantity).toBe(2);

  expect(initialState.cartOpen).toBe(false);
});

// This test simply expects the cart to be empty (and closed) after the CLEAR_CART action is called.
test('CLEAR_CART', () => {
  let newState = reducer(initialState, {
    type: CLEAR_CART,
  });

  expect(newState.cartOpen).toBe(false);
  expect(newState.cart.length).toBe(0);
  expect(initialState.cart.length).toBe(2);
});

// This test expects cartOpen to be the opposite of its previous value each time the action is called.
test('TOGGLE_CART', () => {
  let newState = reducer(initialState, {
    type: TOGGLE_CART,
  });

  expect(newState.cartOpen).toBe(true);
  expect(initialState.cartOpen).toBe(false);

  let newState2 = reducer(newState, {
    type: TOGGLE_CART,
  });

  expect(newState2.cartOpen).toBe(false);
});

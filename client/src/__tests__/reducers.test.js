// import our actions
import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../utils/actions.js';

import { reducer } from '../utils/reducers.js';

// create a sample of what our global state will look like
const initialState = {
  products: [],
  categories: [{ name: 'Food' }],
  currentCategory: '1',
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

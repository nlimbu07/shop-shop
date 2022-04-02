import React, { useEffect } from 'react';
import CartItem from '../CartItem';
// we imported the Auth module to conditionally render the checkout button in the JSX.
import Auth from '../../utils/auth';
import './style.css';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';

const Cart = () => {
  // You'll use the custom useStoreContext Hook to establish a state variable and the dispatch() function to update the state
  const [state, dispatch] = useStoreContext();

  // use this stripePromise object to perform the checkout redirect.
  // But first, we need to collect the IDs for the items being purchased.
  const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

  // The data variable will contain the checkout session, but only after the query is called with the getCheckout() function.
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  // to check if there's anything in the state's cart property on load. If not, we'll retrieve data from the IndexedDB cart object store.
  // we're checking to see if state.cart.length is 0, then executing getCart() to retrieve the items from the cart object store and save it to the global state object.
  // We dispatch the ADD_MULTIPLE_TO_CART action here because we have an array of items returning from IndexedDB, even if it's just one product saved.
  // This way we can just dump all of the products into the global state object at once instead of doing it one by one.
  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  // add another useEffect Hook to watch for changes to data. We'll use the stripePromise object to redirect to Stripe once the data variable has data in it.
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  // This function will add up the prices of everything saved in state.cart, which can then be displayed in the JSX
  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  if (!state.cartOpen) {
    return (
      <div className='cart-closed' onClick={toggleCart}>
        <span role='img' aria-label='trash'>
          🛒
        </span>
      </div>
    );
  }

  // When the user clicks Checkout, this function will loop over the items saved in state.cart and add their IDs to a new productIds array.
  // This productIds array is what the QUERY_CHECKOUT query would need to generate the Stripe session.
  function submitCheckout() {
    const productIds = [];

    getCheckout({
      variables: { products: productIds },
    });

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });
  }

  return (
    <div className='cart'>
      {/* This handler will toggle the cartOpen value whenever the [close] text is clicked */}
      <div className='close' onClick={toggleCart}>
        [close]
      </div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {/* The items on state.cart are mapped into a series of <CartItem /> components. */}
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
          <div className='flex-row space-between'>
            <strong>Total: ${calculateTotal()}</strong>
            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role='img' aria-label='shocked'>
            😱
          </span>
          You haven't add anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

export default Cart;

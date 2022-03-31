import React from 'react';
import CartItem from '../CartItem';
// we imported the Auth module to conditionally render the checkout button in the JSX.
import Auth from '../../utils/auth';
import './style.css';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART } from '../../utils/actions';

const Cart = () => {
  // You'll use the custom useStoreContext Hook to establish a state variable and the dispatch() function to update the state
  const [state, dispatch] = useStoreContext();

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

  console.log(state);

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
              <button>Checkout</button>
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

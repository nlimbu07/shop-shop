// createContext will be used to instantiate a new Context object. we're using it to create the container to hold our global state data
// useContext is another React Hook that will allow us to use the state created from the createContext function
import React, { createContext, useContext } from 'react';
import { useProductReducer } from './reducers';

const StoreContext = createContext(); // it creates  a new context object
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    products: [],
    categories: [],
    currentCategory: '',
  });
  // use this to confirm it works!
  console.log(state);
  return <Provider value={[state, dispatch]} {...props} />;
};

// When we execute this function from within a component, we will receive the [state, dispatch] data our StoreProvider provider manages for us.
const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };

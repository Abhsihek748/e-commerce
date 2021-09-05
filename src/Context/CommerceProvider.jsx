import React, { useState, useEffect } from 'react';
import { commerce } from '../lib/commerce';

export const CommerceContext = React.createContext();

const CommerceProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);

    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchProducts();
  }, []);

  const values = {
    cart,
    products,
    order,
    errorMessage,
    fetchProducts,
    handleAddToCart,
    handleEmptyCart,
    handleCaptureCheckout,
    handleRemoveFromCart,
    handleUpdateCartQty,
    refreshCart,
  };
  // eslint-disable-next-line no-console
  console.log(values);
  return (
    <CommerceContext.Provider value={values}>
      {children}
    </CommerceContext.Provider>
  );
};

export default CommerceProvider;

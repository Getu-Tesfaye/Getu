import React from 'react';
import { CartProvider } from './cart/CartProvider';
import Header from './Header';
import Menu from './Menu';
import OrderForm from './OrderForm';

export default function App() {
  return (
    <CartProvider>
      <Header />
      <Menu />
      <OrderForm />
    </CartProvider>
  );
}
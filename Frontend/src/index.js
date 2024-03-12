import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./index.css"

import { BrowserRouter } from 'react-router-dom';
import { UserAuthContextProvider } from './components/UserAuthContext';
import { CartProvider } from './components/CartContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter >
    <UserAuthContextProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </UserAuthContextProvider>
  </BrowserRouter >

);


import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./index.css"

import { BrowserRouter } from 'react-router-dom';
import { UserAuthContextProvider } from './components/UserAuthContext';
import { CartProvider } from './components/Context/CartContext';
import { Profiler } from 'react';
import Snowfall from 'react-snowfall'
const root = ReactDOM.createRoot(document.getElementById('root'));

function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
  // Aggregate or log render timings...
}
root.render(


  <BrowserRouter >
    <UserAuthContextProvider>
      <CartProvider>
        <StrictMode>
          <Profiler id='App' onRender={onRender}>
            <div style={{ position: 'relative' }}>
              <Snowfall color='#ed4949' />
              <App />
            </div>,

          </Profiler>
        </StrictMode>
      </CartProvider>
    </UserAuthContextProvider>
  </BrowserRouter >

);

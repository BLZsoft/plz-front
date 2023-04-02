import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import ReactDOM from 'react-dom/client';

import { App } from './app';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

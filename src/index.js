import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/styles/global.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/providers/router';
import { Provider } from 'react-redux';
import { store } from './app/app-store';
import { AuthProvider } from './shared/contexts/auth-context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

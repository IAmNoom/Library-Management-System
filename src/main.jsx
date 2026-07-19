import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css';

// Import custom styles
import './App.css';

import App from './App';

/**
 * Main entry point of the application.
 * Wraps the App with:
 * - Redux Provider for global state management
 * - BrowserRouter for client-side routing
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

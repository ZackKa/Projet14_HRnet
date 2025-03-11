import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';  // Importation du Provider
import './index.css';
import App from './app/App.jsx';
import store from './app/Store.jsx';  // Importation du store

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Enroule l'app avec le Provider */}
      <App />
    </Provider>
  </StrictMode>
);
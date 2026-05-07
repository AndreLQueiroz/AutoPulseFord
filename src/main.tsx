import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { VehicleProvider } from './context/VehicleContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <VehicleProvider>
      <App />
    </VehicleProvider>
  </React.StrictMode>
);
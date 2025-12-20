import './amplifyClient';                 // ✅ runs config first

import * as React from 'react';
import { createRoot } from 'react-dom/client';
import '@aws-amplify/ui-react/styles.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import './index.css';
import App from './App';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find root element');

createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

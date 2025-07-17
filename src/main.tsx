// src/main.tsx
import * as React from 'react';

import { createRoot } from 'react-dom/client';
import { Amplify } from 'aws-amplify'; // Corrected named import
import awsExports from './aws-exports'; // <--- THIS LINE NEEDS TO BE SEPARATE
import '@aws-amplify/ui-react/styles.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import './index.css';
import App from './App';

Amplify.configure(awsExports);

const container = document.getElementById('root');
if (!container) {
  throw new Error('Failed to find root element');
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
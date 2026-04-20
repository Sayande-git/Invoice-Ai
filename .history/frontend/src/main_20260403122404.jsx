import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react';

// Import your publishable key 
const PUBLISHABLE_KEY = "test_key";
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing publishable key. Please set the VITE_CLERK_PUBLISHABLE_KEY environment variable.');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </StrictMode>
);

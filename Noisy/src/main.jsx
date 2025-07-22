import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import './index.css'
import router from './router/router';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { APIProvider } from '@vis.gl/react-google-maps';
import CmsProvider from './providers/CmsProvider';
import { Toaster } from 'react-hot-toast';

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <CmsProvider>
          <RouterProvider router={router} />
        </CmsProvider>
      </APIProvider>
      {/* toast */}
      <Toaster
        toastOptions={{
          className: 'text-sm capitalize font-poppins font-medium'
        }}
        position="top-center"
        reverseOrder={false}
      />
    </QueryClientProvider>
  </StrictMode>
);

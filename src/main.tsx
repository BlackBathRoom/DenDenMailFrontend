import { StrictMode } from 'react';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import type { AxiosError } from 'axios';
import ReactDOM from 'react-dom/client';

import { routeTree } from './routeTree.gen';
import './styles/global.css';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError;
  }
}

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import MainRoutes from './MainRoutes';
import GuestLayout from 'layouts/GuestLayout';
import GuestRoute from './GuestRoute';

const Login = lazy(() => import('../views/auth/login'));
const Register = lazy(() => import('../views/auth/register'));

const router = createBrowserRouter(
  [
    // 🚪 GUEST (BELUM LOGIN)
    {
      element: <GuestRoute />,
      children: [
        {
          path: '/',
          element: <GuestLayout />,
          children: [
            { index: true, element: <Navigate to="/login" replace /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> }
          ]
        }
      ]
    },

    // 🔒 PROTECTED (SUDAH LOGIN)
    MainRoutes,

    // fallback
    {
      path: '*',
      element: <Navigate to="/login" replace />
    }
  ],
  { basename: import.meta.env.VITE_APP_BASE_NAME }
);

export default router;

import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// project import
import MainRoutes from './MainRoutes';
import GuestLayout from 'layouts/GuestLayout';

// auth pages
const Login = lazy(() => import('../views/auth/login'));
const Register = lazy(() => import('../views/auth/register'));

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter(
  [
    // 🔐 AUTH (DEFAULT)
    {
      path: '/',
      element: <GuestLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="/login" replace />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'register',
          element: <Register />
        }
      ]
    },

    // 🔒 ADMIN ROUTES
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

import { lazy } from 'react';
import GuestLayout from 'layouts/GuestLayout';

const Login = lazy(() => import('../views/auth/login'));
const Register = lazy(() => import('../views/auth/register'));

const AuthRoutes = {
    path: '/',
    element: <GuestLayout />,
    children: [
        {
            index: true,
            element: <Login />
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
};

export default AuthRoutes;

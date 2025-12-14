import { lazy } from 'react';
import AdminLayout from 'layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';

const DashboardSales = lazy(() => import('../views/dashboard/DashSales'));
const ListIklan = lazy(() => import('../views/dashboard/Iklan'));
const ListKalangan = lazy(() => import('../views/dashboard/Kalangan'));
const ListWebinar = lazy(() => import('../views/dashboard/Webinar'));
const Pendaftaran = lazy(() => import('../views/dashboard/Pendaftaran'));

const MainRoutes = {
  path: '/dashboard',
  element: <ProtectedRoute />, // 🔐 LOGIN WAJIB
  children: [
    {
      element: <AdminLayout />,
      children: [
        // 🔒 ADMIN ONLY
        {
          path: 'admin',
          element: <ProtectedRoute allowedRoles={['admin']} />,
          children: [
            { index: true, element: <DashboardSales /> },
            { path: 'sales', element: <DashboardSales /> },
            { path: 'list-iklan', element: <ListIklan /> },
            { path: 'list-kalangan', element: <ListKalangan /> },
            { path: 'list-webinar', element: <ListWebinar /> }
          ]
        },

        // 👤 MEMBER ONLY
        {
          path: 'member',
          element: <ProtectedRoute allowedRoles={['member']} />,
          children: [
            { index: true, element: <Pendaftaran /> }
          ]
        }
      ]
    }
  ]
};

export default MainRoutes;

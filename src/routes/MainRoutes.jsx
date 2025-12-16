import { lazy } from 'react';
import AdminLayout from 'layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';

const DashboardSales = lazy(() => import('../views/dashboard/DashSales'));
const ListIklan = lazy(() => import('../views/dashboard/Iklan'));
const CreateIklan = lazy(() => import('../views/dashboard/Iklan/create'));
const IklanDetailEdit = lazy(() => import('../views/dashboard/Iklan/detail'));

const ListKalangan = lazy(() => import('../views/dashboard/Kalangan'));
const CreateKalangan = lazy(() => import('../views/dashboard/Kalangan/create'));
const KalanganDetailEdit = lazy(() => import('../views/dashboard/Kalangan/detail'));

const ListWebinar = lazy(() => import('../views/dashboard/Webinar'));
const CreateWebinar = lazy(() => import('../views/dashboard/Webinar/create'));
const DetailEditWebinar = lazy(() => import('../views/dashboard/Webinar/detail'));

const Pendaftaran = lazy(() => import('../views/dashboard/Pendaftaran'));
const ListPendaftaranAdmin = lazy(() => import('../views/dashboard/PendaftaranAdmin'));

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
            { path: 'create-iklan', element: <CreateIklan /> },
            { path: 'iklan/:id', element: <IklanDetailEdit /> },

            { path: 'list-kalangan', element: <ListKalangan /> },
            { path: 'create-kalangan', element: <CreateKalangan /> },
            { path: 'kalangan/:id', element: <KalanganDetailEdit /> },

            { path: 'list-webinar', element: <ListWebinar /> },
            { path: 'create-webinar', element: <CreateWebinar /> },
            { path: 'webinar/:id', element: <DetailEditWebinar /> },

            { path: 'list-pendaftaran', element: <ListPendaftaranAdmin /> },
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

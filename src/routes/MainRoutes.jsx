import { lazy } from 'react';
import AdminLayout from 'layouts/AdminLayout';

const DashboardSales = lazy(() => import('../views/dashboard/DashSales/index'));
const Typography = lazy(() => import('../views/ui-elements/basic/BasicTypography'));
const Color = lazy(() => import('../views/ui-elements/basic/BasicColor'));
const FeatherIcon = lazy(() => import('../views/ui-elements/icons/Feather'));
const FontAwesome = lazy(() => import('../views/ui-elements/icons/FontAwesome'));
const MaterialIcon = lazy(() => import('../views/ui-elements/icons/Material'));
const Sample = lazy(() => import('../views/sample'));

const MainRoutes = {
  path: '/dashboard',
  element: <AdminLayout />,
  children: [
    {
      index: true,
      element: <DashboardSales />
    },
    {
      path: 'sales',
      element: <DashboardSales />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'icons/feather',
      element: <FeatherIcon />
    },
    {
      path: 'icons/font-awesome-5',
      element: <FontAwesome />
    },
    {
      path: 'icons/material',
      element: <MaterialIcon />
    },
    {
      path: 'sample-page',
      element: <Sample />
    }
  ]
};

export default MainRoutes;

import { Navigate, RouteObject } from 'react-router-dom';
import ErrorPage from '@pages/Error';
import LoginPage from '@pages/Login';
import React, { lazy } from 'react';
import authLoader from '@layouts/BasicLayout/utils/authLoader';
import BasicLayout from '@layouts/BasicLayout';

const NoAuth = lazy(() => import('@pages/NoAuth'));
const NotFound = lazy(() => import('@pages/NotFound'));

const baseRoutes: RouteObject[] = [
  {
    path: '/',
    loader: authLoader,
    element: <BasicLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: '*',
            element: <Navigate to="/" replace={true} />,
          },
        ],
      },
    ],
  },
  {
    path: '/403',
    element: <NoAuth />,
  },
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
];

export default baseRoutes;

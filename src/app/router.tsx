import React from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import { useLogto } from '@logto/react';
import Callback from 'pages/Callback';
import Index from 'pages/Index';
import { objectsRoutes } from 'pages/Objects/routes';
import { partnerRoutes } from 'pages/Partners/routes';

import { Header } from '../components/Header';
import { Layout } from '../components/Layout';

import { GlobalStyle } from './providers/with-theme/globalStyle';

const routes = [
  ...partnerRoutes,
  ...objectsRoutes,
  {
    element: <Callback />,
    path: '/callback',
  },
  {
    element: <Index />,
    path: '/',
  },
  {
    element: <Navigate to={'/'} />,
    path: '*',
  },
];

export const Router = () => {
  const { isAuthenticated } = useLogto();
  const routesContent = useRoutes(routes);

  return (
    <>
      <GlobalStyle />
      <Header disabled={!isAuthenticated} />
      <Layout disabled={!isAuthenticated}>{routesContent}</Layout>
    </>
  );
};

import { RouteObject } from 'react-router-dom';

import ModifyProfile from './ModifyProfile';

import Profile from './index';

export const partnersPaths = {
  list: '/profile',
  modify: '/profile/modify/:id?',
};

export const partnerRoutes: RouteObject[] = [
  {
    path: partnersPaths.list,
    element: <Profile />,
  },
  {
    path: partnersPaths.modify,
    element: <ModifyProfile />,
  },
];

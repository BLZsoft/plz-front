import { RouteObject } from 'react-router-dom';

import ModifyObject from './ModifyObjects';

import Object from './index';

export const partnersPaths = {
  list: '/object',
  modify: '/object/modify/:id?',
};

export const partnerRoutes: RouteObject[] = [
  {
    path: partnersPaths.list,
    element: <Object />,
  },
  {
    path: partnersPaths.modify,
    element: <ModifyObject />,
  },
];

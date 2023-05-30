import { RouteObject } from 'react-router-dom';

import ModifyPartners from './ModifyPartner';

import Objects from './index';

export const partnersPaths = {
  list: '/objects',
  modify: '/objects/modify/:id?',
};

export const partnerRoutes: RouteObject[] = [
  {
    path: partnersPaths.list,
    element: <Objects />,
  },
  {
    path: partnersPaths.modify,
    element: <ModifyPartners />,
  },
];

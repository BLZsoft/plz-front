import { RouteObject } from 'react-router-dom';

import ModifyPartners from './ModifyPartner';

import Partners from './index';

export const partnersPaths = {
  list: '/partners',
  modify: '/partners/modify/:id?',
};

export const partnerRoutes: RouteObject[] = [
  {
    path: partnersPaths.list,
    element: <Partners />,
  },
  {
    path: partnersPaths.modify,
    element: <ModifyPartners />,
  },
];

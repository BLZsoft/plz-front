import { RouteObject } from 'react-router-dom';

import AUPT from './AUPT';

import Calculators from './index';

export const calcsPaths = {
  list: '/calculators',
  modify: '/calculators/:id?',
};

export const calcRoutes: RouteObject[] = [
  {
    path: calcsPaths.list,
    element: <Calculators />,
  },
  {
    path: calcsPaths.modify,
    element: <AUPT />,
  },
];

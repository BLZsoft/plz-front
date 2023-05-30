import { RouteObject } from 'react-router-dom';

import ModifyObject from './ModifyObject';

import Objects from './index';

export const objectsPaths = {
  list: '/objects',
  modify: '/objects/modify/:id?',
};

export const objectsRoutes: RouteObject[] = [
  {
    path: objectsPaths.list,
    element: <Objects />,
  },
  {
    path: objectsPaths.modify,
    element: <ModifyObject />,
  },
];

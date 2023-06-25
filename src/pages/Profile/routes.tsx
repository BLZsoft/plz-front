import { RouteObject } from 'react-router-dom';

import Profile from './index';

export const profilePaths = {
  index: '/profile',
};

export const profileRoutes: RouteObject[] = [
  {
    path: profilePaths.index,
    element: <Profile />,
  },
];

import { reflect } from '@effector/reflect';
import { createRouteView } from 'atomic-router-react';

import { currentRoute, dataLoadedRoute, query } from './model';
import { ObjectHomePageLoader as ObjectListPageLoader, ObjectHomePageView as ObjectListPageView } from './view';

export const ObjectListPage = {
  route: currentRoute,
  view: createRouteView({
    route: dataLoadedRoute,
    view: reflect({
      view: ObjectListPageView,
      bind: {
        data: query.$data,
      },
    }),
    otherwise: ObjectListPageLoader,
  }),
};

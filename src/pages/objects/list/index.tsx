import { reflect } from '@effector/reflect';
import { createRouteView } from 'atomic-router-react';

import { currentRoute, dataLoadedRoute, objectsListPageQuery } from './model';
import { ObjectHomePageLoader as ObjectListPageLoader, ObjectHomePageView as ObjectListPageView } from './view';

export const ObjectListPage = {
  route: currentRoute,
  view: createRouteView({
    route: dataLoadedRoute,
    view: reflect({
      view: ObjectListPageView,
      bind: {
        data: objectsListPageQuery.$data,
      },
    }),
    otherwise: ObjectListPageLoader,
  }),
};

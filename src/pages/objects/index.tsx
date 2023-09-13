import { reflect } from '@effector/reflect';
import { createRouteView, createRoutesView } from 'atomic-router-react';

import { Layout } from '~/pages/layout';

import { ObjectCreatePage } from './create';
import { $data, currentRoute, dataLoadedRoute } from './model';
import { ObjectsPageLoader, ObjectsPageView } from './view';

const ChildRoutes = createRoutesView({
  routes: [ObjectCreatePage],
  otherwise() {
    return <div>11111</div>;
  },
});

export const ObjectsPage = {
  route: currentRoute,
  view: createRouteView({
    route: dataLoadedRoute,
    view: reflect({
      view: ObjectsPageView,
      bind: {
        data: $data,
        ChildRoutes,
      },
    }),
    otherwise: ObjectsPageLoader,
  }),
  layout: Layout,
};
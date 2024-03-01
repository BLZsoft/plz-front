import { reflect } from '@effector/reflect';
import { createRoutesView, createRouteView } from 'atomic-router-react';

import { Layout } from '~/pages/layout';

import { ObjectEditPage } from './[id]';
import { ObjectCreatePage } from './create';
import { ObjectListPage } from './list';
import { currentRoute } from './model';
import { ObjectsRootPageLoader, ObjectsRootPageView } from './view';

const ChildRoutes = createRoutesView({
  routes: [ObjectListPage, ObjectCreatePage, ObjectEditPage],
  otherwise() {
    return (
      <div className="flex flex-col items-center">
        <span className="text-2xl text-red-800">Not found.</span>
        <span className="mt-8 text-xl">Edit me here.</span>
        <code className="text-lg font-bold">pages/objects/index.tsx</code>
      </div>
    );
  },
});

export const ObjectsPage = {
  route: currentRoute,
  view: createRouteView({
    route: currentRoute,
    view: reflect({
      view: ObjectsRootPageView,
      bind: {
        ChildRoutes,
      },
    }),
    otherwise: ObjectsRootPageLoader,
  }),
  layout: Layout,
};

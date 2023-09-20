import { reflect } from '@effector/reflect';
import { createRouteView, createRoutesView } from 'atomic-router-react';

import { Layout } from '~/pages/layout';

import { ObjectCreatePage } from './create';
import { ObjectHomePage } from './home';
import { $data, currentRoute, dataLoadedRoute } from './model';
import { ObjectsPageLoader, ObjectsPageView } from './view';

const ChildRoutes = createRoutesView({
  routes: [ObjectCreatePage, ObjectHomePage],
  otherwise() {
    return (
      <div className='flex flex-col items-center'>
        <span className='text-2xl text-red-800'>Not found.</span>
        <span className='mt-8 text-xl'>Edit me here.</span>
        <code className='text-lg font-bold'>pages/objects/index.tsx</code>
      </div>
    );
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

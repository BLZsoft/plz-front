import { reflect } from '@effector/reflect';
import { createRoutesView, createRouteView } from 'atomic-router-react';

import { Layout } from '~/pages/layout';

import { OrganizationDetailPage } from './[id]';
import { $data, currentRoute, dataLoadedRoute } from './model';
import { OrganizationsPageLoader, OrganizationsPageView } from './view';

const ChildRoutes = createRoutesView({
  routes: [OrganizationDetailPage],
  otherwise() {
    return (
      <div className={'flex h-full w-full items-center justify-center p-8 pr-0 text-center text-xl text-zinc-600'}>
        Выберите организацию из списка слева
      </div>
    );
  },
});

export const OrganizationsRoot = {
  route: currentRoute,
  view: createRouteView({
    route: dataLoadedRoute,
    view: reflect({
      view: OrganizationsPageView,
      bind: {
        data: $data,
        ChildRoutes,
      },
    }),
    otherwise: OrganizationsPageLoader,
  }),
  layout: Layout,
};

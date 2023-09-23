import { reflect } from '@effector/reflect';
import { createRoutesView, createRouteView } from 'atomic-router-react';

import { Layout } from '~/pages/layout';

import { OrganizationDetailPage } from './[id]';
import { OrganizationCreatePage } from './create';
import { $data, authenticatedRoute, currentRoute } from './model';
import { OrganizationsPageLoader, OrganizationsPageView } from './view';

const ChildRoutes = createRoutesView({
  routes: [OrganizationCreatePage, OrganizationDetailPage],
  otherwise() {
    return (
      <div className={'flex h-full w-full items-center justify-center'}>
        <span className={'text-center text-xl text-zinc-600'}>Выберите организацию из списка слева</span>
      </div>
    );
  },
});

export const OrganizationsRoot = {
  route: currentRoute,
  view: createRouteView({
    route: authenticatedRoute,
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

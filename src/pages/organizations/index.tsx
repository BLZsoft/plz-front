import { reflect } from '@effector/reflect';
import { createRouteView } from 'atomic-router-react';

import { Layout } from '~/pages/layout';

import { $data, currentRoute, dataLoadedRoute } from './model';
import { OrganizationsPageLoader, OrganizationsPageView } from './view';

export const OrganizationsPage = {
  route: currentRoute,
  view: createRouteView({
    route: dataLoadedRoute,
    view: reflect({
      view: OrganizationsPageView,
      bind: {
        data: $data,
      },
    }),
    otherwise: OrganizationsPageLoader,
  }),
  layout: Layout,
};

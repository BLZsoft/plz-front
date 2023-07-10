import { reflect } from '@effector/reflect';
import { createRouteView } from 'atomic-router-react';

import { Layout } from '~/pages/layout';

import { $data, currentRoute, dataLoadedRoute } from './model';
import { HomePageLoader, HomePageView } from './view';

export const HomePage = {
  route: currentRoute,
  view: createRouteView({
    route: dataLoadedRoute,
    view: reflect({
      view: HomePageView,
      bind: {
        data: $data,
      },
    }),
    otherwise: HomePageLoader,
  }),
  layout: Layout,
};

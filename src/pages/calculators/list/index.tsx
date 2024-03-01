import { reflect } from '@effector/reflect';
import { createRouteView, type RouteViewConfig } from 'atomic-router-react';

import { currentRoute, dataLoadedRoute, type Params } from './model';
import { CalculatorsListPageLoad, CalculatorsListPageView, type Props } from './view';

export const CalculatorsListPage = {
  route: currentRoute,
  view: createRouteView<Props, Params, RouteViewConfig<Props, Params>>({
    route: dataLoadedRoute,
    view: reflect({
      view: CalculatorsListPageView,
      bind: {
        objectId: dataLoadedRoute.$params.map(({ objectId }) => objectId),
      },
    }),
    otherwise: CalculatorsListPageLoad,
  }),
};

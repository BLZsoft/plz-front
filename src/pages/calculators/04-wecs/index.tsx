import { reflect } from '@effector/reflect';
import { createRouteView, type RouteViewConfig } from 'atomic-router-react';

import { currentRoute, dataLoadedRoute, objectQuery, type Params } from './model';
import { CalculatorWecs04PageLoad, CalculatorWecs04PageView, type Props } from './view';

export const CalculatorsWecs04Page = {
  route: currentRoute,
  view: createRouteView<Props, Params, RouteViewConfig<Props, Params>>({
    route: dataLoadedRoute,
    view: reflect({
      view: CalculatorWecs04PageView,
      bind: {
        object: objectQuery.$data,
      },
    }),
    otherwise: CalculatorWecs04PageLoad,
  }),
};

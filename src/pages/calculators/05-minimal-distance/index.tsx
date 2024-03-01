import { reflect } from '@effector/reflect';
import { createRouteView, type RouteViewConfig } from 'atomic-router-react';

import { currentRoute, dataLoadedRoute, objectQuery, type Params } from './model';
import { CalculatorMinimalDistance05PageView, CalculatorMinimalDistance05PageLoad, type Props } from './view';

export const CalculatorMinimalDistance05Page = {
  route: currentRoute,
  view: createRouteView<Props, Params, RouteViewConfig<Props, Params>>({
    route: dataLoadedRoute,
    view: reflect({
      view: CalculatorMinimalDistance05PageView,
      bind: {
        object: objectQuery.$data,
      },
    }),
    otherwise: CalculatorMinimalDistance05PageLoad,
  }),
};

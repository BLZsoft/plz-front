import { reflect } from '@effector/reflect';
import { createRouteView, type RouteViewConfig } from 'atomic-router-react';

import { currentRoute, dataLoadedRoute, objectQuery, type Params } from './model';
import {
  CalculatorFireResistanceLimitBuildingStructures03PageView,
  CalculatorFireResistanceLimitBuildingStructures03PageLoad,
  type Props,
} from './view';

export const CalculatorFireResistanceLimitBuildingStructures03Page = {
  route: currentRoute,
  view: createRouteView<Props, Params, RouteViewConfig<Props, Params>>({
    route: dataLoadedRoute,
    view: reflect({
      view: CalculatorFireResistanceLimitBuildingStructures03PageView,
      bind: {
        object: objectQuery.$data,
      },
    }),
    otherwise: CalculatorFireResistanceLimitBuildingStructures03PageLoad,
  }),
};

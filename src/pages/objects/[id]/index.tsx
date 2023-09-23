import { reflect } from '@effector/reflect';
import { RouteViewConfig, createRouteView } from 'atomic-router-react';

import { dataLoadedRoute, editObjectModel, idEnsuredRoute } from './model';
import { ObjectEditPageLoad, ObjectEditPageView, Props } from './view';

type Params = { id: string };

export const ObjectEditPage = {
  route: idEnsuredRoute,
  view: createRouteView<Props, Params, RouteViewConfig<Props, Params>>({
    route: dataLoadedRoute,
    view: reflect({
      view: ObjectEditPageView,
      bind: {
        model: editObjectModel,
      },
    }),
    otherwise: ObjectEditPageLoad,
  }),
};

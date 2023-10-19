import { reflect } from '@effector/reflect';
import { createRouteView } from 'atomic-router-react';

import { createObjectModel, currentRoute, dataLoadedRoute } from './model';
import { ObjectCreatePageLoad, ObjectCreatePageView } from './view';

export const ObjectCreatePage = {
  route: currentRoute,
  view: createRouteView({
    route: dataLoadedRoute,
    view: reflect({
      view: ObjectCreatePageView,
      bind: {
        model: createObjectModel,
      },
    }),
    otherwise: ObjectCreatePageLoad,
  }),
};

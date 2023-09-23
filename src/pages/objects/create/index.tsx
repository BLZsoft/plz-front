import { reflect } from '@effector/reflect';

import { createObjectModel, currentRoute } from './model';
import { ObjectCreatePageView } from './view';

export const ObjectCreatePage = {
  route: currentRoute,
  view: reflect({
    view: ObjectCreatePageView,
    bind: {
      model: createObjectModel,
    },
  }),
};

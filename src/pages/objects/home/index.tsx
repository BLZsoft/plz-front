import { reflect } from '@effector/reflect';

// TODO: так делать не хорошо. В идеале каждая страница должна иметь свой собственный store.
import { $data } from '../model';

import { currentRoute } from './model';
import { ObjectHomePageView } from './view';

export const ObjectHomePage = {
  route: currentRoute,
  view: reflect({
    view: ObjectHomePageView,
    bind: {
      data: $data,
    },
  }),
};

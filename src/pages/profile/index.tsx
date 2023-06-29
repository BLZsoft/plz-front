import { reflect } from '@effector/reflect';
import { createRouteView } from 'atomic-router-react';

import { $defaultValues, authenticatedRoute, currentRoute } from './model';
import { ProfilePageLayout, ProfilePageLoader, ProfilePageView } from './view';

export const ProfilePage = {
  route: currentRoute,
  view: createRouteView({
    route: authenticatedRoute,
    view: reflect({
      view: ProfilePageView,
      bind: {
        defaultValues: $defaultValues,
      },
    }),
    otherwise: ProfilePageLoader,
  }),
  layout: ProfilePageLayout,
};

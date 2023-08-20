import { reflect } from '@effector/reflect';
import { createRouteView, RouteViewConfig } from 'atomic-router-react';

import { $members, $organization, $role, currentRoute, dataLoadedRoute } from './model';
import { OrganizationDetailsPageLoader, OrganizationDetailsPageView, Props } from './view';

type Params = { organizationId: string };

export const OrganizationDetailPage = {
  route: currentRoute,
  view: createRouteView<Props, Params, RouteViewConfig<Props, Params>>({
    route: dataLoadedRoute,
    view: reflect({
      view: OrganizationDetailsPageView,
      bind: {
        role: $role,
        members: $members,
        organization: $organization,
      },
    }),
    otherwise: OrganizationDetailsPageLoader,
  }),
};

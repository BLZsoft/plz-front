import { reflect } from '@effector/reflect';

import { $organization, currentRoute } from './model';
import { OrganizationDetailsPageView } from './view';

export const OrganizationDetailPage = {
  route: currentRoute,
  view: reflect({
    view: OrganizationDetailsPageView,
    bind: {
      organization: $organization,
    },
  }),
};

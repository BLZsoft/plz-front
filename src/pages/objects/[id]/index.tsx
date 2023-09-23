import { reflect } from '@effector/reflect';

import { selectOrganizationModel } from '~/features/organization/select-workspace';

import { viewerModel } from '~/entities/viewer';

import { currentRoute } from './model';
import { ObjectEditPageView } from './view';

export const ObjectEditPage = {
  route: currentRoute,
  view: reflect({
    view: ObjectEditPageView,
    bind: {
      organizationId: selectOrganizationModel.$selectedOrganizationId,
      userId: viewerModel.$viewer.map((viewer) => viewer?.sub),
    },
  }),
};

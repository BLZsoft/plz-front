import { reflect } from '@effector/reflect';

import { selectOrganizationModel } from '~/features/organization/select-workspace';

import { viewerModel } from '~/entities/viewer';

import { currentRoute } from './model';
import { ObjectCreatePageView } from './view';

export const ObjectCreatePage = {
  route: currentRoute,
  view: reflect({
    view: ObjectCreatePageView,
    bind: {
      organizationId: selectOrganizationModel.$selectedOrganizationId,
      userId: viewerModel.$viewer.map((viewer) => viewer?.sub),
    },
  }),
};

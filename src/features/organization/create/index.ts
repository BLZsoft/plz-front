import { reflect } from '@effector/reflect';

import { createOrganizationFx } from './model';
import { OrganizationCreateFormView } from './ui';

export const OrganizationCreateForm = reflect({
  view: OrganizationCreateFormView,
  bind: {
    onSubmit: createOrganizationFx,
  },
});

import { reflect } from '@effector/reflect';

import { organizationModel } from '~/entities/organization';

import { $selectedId, selectOrganization } from './model';
import { Props, View } from './ui';

export const OrganizationSelectActive = reflect<Props>({
  view: View,
  bind: {
    current: $selectedId,
    options: organizationModel.$organizations,
    onChange: selectOrganization,
  },
});

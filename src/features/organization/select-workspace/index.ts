// TODO: @d.tankov — разделить "organizations" на "workspaces" и "organizations"
import { reflect } from '@effector/reflect';
import { combine } from 'effector';
import { and, not } from 'patronum';

import { organizationsModel } from '~/entities/organizations';

import * as selectOrganizationModel from './model';
import { Props, View } from './ui';

const PERSONAL_ID = 'personal';

const $loading = and(
  not(organizationsModel.$availableOrganizations.map((orgs) => orgs.length)),
  organizationsModel.getAvailableOrganizationsFx.pending,
);

const $current = selectOrganizationModel.$selectedOrganizationId.map((v) => v ?? PERSONAL_ID);

const $options = combine(
  {
    availableOrganizations: organizationsModel.$availableOrganizations,
    personalOrganization: selectOrganizationModel.$personalOrganization.map((personalOrganization) => ({
      ...personalOrganization,
      id: PERSONAL_ID,
    })),
  },
  ({ availableOrganizations, personalOrganization }) => [...availableOrganizations, personalOrganization],
);

const onChange = selectOrganizationModel.organizationSelected.prepend<string | null>((selected) =>
  selected === PERSONAL_ID ? null : selected,
);

export const OrganizationSelect = reflect<Props>({
  view: View,
  bind: {
    loading: $loading,
    current: $current,
    options: $options,
    onChange,
  },
});

export { selectOrganizationModel };

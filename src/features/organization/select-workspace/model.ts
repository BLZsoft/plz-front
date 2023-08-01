// FIXME: @d.tankov — разделить логику: вынести работу с персональной организацией в другой файл
import { combine, createEvent, createStore, Store } from 'effector';

import { organizationsModel } from '~/entities/organizations';
import { viewerModel } from '~/entities/viewer';

const LOCAL_STORAGE_KEY = 'organization';

export type PersonalOrganization = {
  id: null;
  name: string;
  image: string | null;
};

export const $personalOrganization: Store<PersonalOrganization> = viewerModel.$viewer.map((v) => ({
  id: null,
  name: 'Личное пространство',
  image: v?.picture ?? null,
}));

export const organizationSelected = createEvent<string | null>();

organizationSelected.watch((selectedId) => {
  if (selectedId) {
    localStorage.setItem(LOCAL_STORAGE_KEY, selectedId);
    return;
  }

  localStorage.removeItem(LOCAL_STORAGE_KEY);
});

export const $selectedOrganizationId = createStore<string | null>(null)
  .on(organizationSelected, (_, id) => id)
  .on(organizationsModel.getAvailableOrganizationsFx.doneData, (_, organizations) => {
    const savedOrganizationId = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!savedOrganizationId) {
      return null;
    }

    const stillInOrganization = organizations.some((org) => org.id === savedOrganizationId);

    return stillInOrganization ? savedOrganizationId : null;
  });

export const $selectedOrganization = combine(
  {
    availableOrganizations: organizationsModel.$availableOrganizations,
    personalOrganization: $personalOrganization,
    selectedOrganizationId: $selectedOrganizationId,
  },
  ({ availableOrganizations, personalOrganization, selectedOrganizationId }) =>
    selectedOrganizationId
      ? availableOrganizations.find((org) => org.id === selectedOrganizationId)
      : personalOrganization,
);

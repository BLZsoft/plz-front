// FIXME: @d.tankov — разделить логику: вынести работу с персональной организацией в другой файл
import { Store, combine, createEvent, createStore } from 'effector';

import { organizationsModel } from '~/entities/organizations';

import { sessionModel } from '~/shared/session';

const LOCAL_STORAGE_KEY = 'organization';

export type PersonalOrganization = {
  id: null;
  name: string;
  image: string | null;
};

export const $personalOrganization: Store<PersonalOrganization> = sessionModel.$session.map((v) => ({
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
  .on(organizationsModel.query.finished.success, (_, { result }) => {
    const savedOrganizationId = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!savedOrganizationId) {
      return null;
    }

    const stillInOrganization = result.some((org) => org.id === savedOrganizationId);

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
      ? availableOrganizations?.find((org) => org.id === selectedOrganizationId)
      : personalOrganization,
);

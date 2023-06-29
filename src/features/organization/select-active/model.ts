import { createEffect, createEvent, sample } from 'effector';

import { organizationModel } from '~/entities/organization';

const LOCAL_STORAGE_KEY = 'organizationId';

const writeLocalStorageFx = createEffect((id) => {
  if (id) {
    localStorage.setItem(LOCAL_STORAGE_KEY, id);
  } else {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
});

export const selectOrganization = createEvent<string | null>();

export const $selectedId = organizationModel.$organization.map((o) => o?.id);

// Сохраняем выбор в localStorage
sample({
  clock: selectOrganization,
  target: writeLocalStorageFx,
});

// Заполняем $organization из $organizations при помощи id
sample({
  source: organizationModel.$organizations,
  clock: selectOrganization,
  fn: (organizations, id) => organizations?.find((org) => org.id === id) ?? null,
  target: organizationModel.$organization,
});

// После загрузки: заполняем $organization из localStorage или выбираем первую
sample({
  clock: organizationModel.fetchOrganizationsFx.doneData,
  fn: (organizations): string | null => {
    const localStorageId = localStorage.getItem(LOCAL_STORAGE_KEY);
    const localInLoaded = organizations.find((o) => o.id === localStorageId);

    if (localStorageId && localInLoaded) {
      return localStorageId;
    }

    return organizations[0].id;
  },
  target: selectOrganization,
});

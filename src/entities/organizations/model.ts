import { createEffect, createStore, sample, Store } from 'effector';

import { Organization, organizationsApi } from '~/shared/api/organizations';
import { appStarted } from '~/shared/lib/lifecycle';

export const getAvailableOrganizationsFx = createEffect<void, Organization[]>(() =>
  organizationsApi.availableOrganizations(),
);

export const $availableOrganizations: Store<Organization[]> = createStore<Organization[]>([]).on(
  getAvailableOrganizationsFx.doneData,
  (_, payload) => payload,
);

sample({
  clock: appStarted,
  target: getAvailableOrganizationsFx,
});

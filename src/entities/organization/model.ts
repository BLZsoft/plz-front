import { createStore, sample, createEffect } from 'effector';

import { Organization, organizationsApi } from '~/shared/api/organizations';
import { appStarted } from '~/shared/lib/lifecycle';

export const fetchOrganizationsFx = createEffect<void, Organization[]>(() => organizationsApi.fetchOrganizations());

export const $organizations = createStore<Organization[] | null>(null).on(
  fetchOrganizationsFx.doneData,
  (_, payload) => payload,
);

export const $organization = createStore<Organization | null>(null);

sample({
  clock: appStarted,
  target: fetchOrganizationsFx,
});

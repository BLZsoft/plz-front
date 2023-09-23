import { attachOperation } from '@farfetched/core';
import { createEffect, sample } from 'effector';

import { Organization, organizationsApi } from '~/shared/api/organizations';
import { sessionModel } from '~/shared/session';

export const getAvailableOrganizationsFx = createEffect<void, Organization[]>(() =>
  organizationsApi.availableOrganizations(),
);

export const query = attachOperation(organizationsApi.query);

export const $availableOrganizations = query.$data;

sample({
  clock: sessionModel.$session.updates,
  target: query.start,
});

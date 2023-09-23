import { freshChain } from '@farfetched/atomic-router';
import { attachOperation } from '@farfetched/core';
import { chainRoute } from 'atomic-router';
import { sample } from 'effector';

import { chainAuthenticated } from '~/features/authn/protected-routes';
import { selectOrganizationModel } from '~/features/organization/select-workspace';

import { objectsApi } from '~/shared/api/objects';
import { routes } from '~/shared/router';

export const currentRoute = routes.objects.home;

const authenticatedRoute = chainAuthenticated(currentRoute);

const $currentOrganization = selectOrganizationModel.$selectedOrganizationId;

export const query = attachOperation(objectsApi.queryByOrg, {
  source: $currentOrganization,
  mapParams: (_: void, organizationId) => ({ organizationId }),
});

sample({
  clock: $currentOrganization.updates,
  filter: authenticatedRoute.$isOpened,
  target: query.start,
});

export const dataLoadedRoute = chainRoute({
  route: authenticatedRoute,
  ...freshChain(query),
});

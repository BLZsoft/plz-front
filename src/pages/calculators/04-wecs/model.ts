import { startChain } from '@farfetched/atomic-router';
import { attachOperation } from '@farfetched/core';
import { chainRoute } from 'atomic-router';

import { chainAuthenticated } from '~/features/authn/protected-routes';

import { objectsApi } from '~/shared/api/objects';
import { chainUuid } from '~/shared/lib/utils';
import { routes } from '~/shared/router';

export type Params = { objectId: string };

export const currentRoute = routes.calculators.wecs04;
export const authenticatedRoute = chainAuthenticated(currentRoute);
export const idEnsuredRoute = chainUuid(authenticatedRoute, 'objectId');

export const objectQuery = attachOperation(objectsApi.queryById, {
  mapParams: (params: { objectId: string }) => ({ id: params.objectId }),
});

export const dataLoadedRoute = chainRoute({
  route: idEnsuredRoute,
  ...startChain(objectQuery),
});

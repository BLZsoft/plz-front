import { freshChain } from '@farfetched/atomic-router';
import { attachOperation, update } from '@farfetched/core';
import { chainRoute } from 'atomic-router';
import { sample } from 'effector';

import { chainAuthenticated } from '~/features/authn/protected-routes';
import { selectOrganizationModel } from '~/features/organization/select-workspace';

import { Object, objectsApi } from '~/shared/api/objects';
import { routes } from '~/shared/router';

export const currentRoute = routes.objects.home;

const authenticatedRoute = chainAuthenticated(currentRoute);

const $currentOrganization = selectOrganizationModel.$selectedOrganizationId;

export const objectsListPageQuery = attachOperation(objectsApi.queryByOrg, {
  source: $currentOrganization,
  mapParams: (_: void, organizationId) => ({ organizationId }),
});

update(objectsListPageQuery, {
  on: objectsApi.removeMutation,
  by: {
    success: ({ mutation, query }) => {
      console.log(mutation);
      console.log(query);

      if (query && 'result' in query) {
        return {
          result: [...query.result.filter((object) => object.id !== mutation.params.id)],
        };
      }

      return { result: [] as Object[] };
    },
  },
});

sample({
  clock: $currentOrganization.updates,
  filter: authenticatedRoute.$isOpened,
  target: objectsListPageQuery.start,
});

export const dataLoadedRoute = chainRoute({
  route: authenticatedRoute,
  ...freshChain(objectsListPageQuery),
});

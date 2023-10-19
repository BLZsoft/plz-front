import { startChain } from '@farfetched/atomic-router';
import { attachOperation, update } from '@farfetched/core';
import { chainRoute } from 'atomic-router';
import { combine } from 'effector';

import { CreateObjectForm } from '~/features/objects/create';
import { selectOrganizationModel } from '~/features/organization/select-workspace';

import { objectTypesApi } from '~/shared/api/object-types';
import { objectsApi } from '~/shared/api/objects';
import { ObjectFormPayload } from '~/shared/forms/object';
import { routes } from '~/shared/router';
import { sessionModel } from '~/shared/session';

const objectTypesQuery = attachOperation(objectTypesApi.query);

export const currentRoute = routes.objects.create;
export const dataLoadedRoute = chainRoute({
  route: currentRoute,
  ...startChain(objectTypesQuery),
});

const $userId = sessionModel.$session.map((session) => session?.sub ?? '');
const $currentOrganization = selectOrganizationModel.$selectedOrganizationId;

const $mutation = attachOperation(objectsApi.createMutation, {
  source: combine({ organizationId: $currentOrganization, userId: $userId }),
  mapParams: (params: ObjectFormPayload, { organizationId, userId }): objectsApi.CreateObjectMutationParams => ({
    object: {
      ...params,
      organization_id: organizationId,
      owner_id: userId,
    },
  }),
});

update(objectsApi.queryByOrg, {
  on: $mutation,
  by: {
    success({ mutation, query }) {
      if (!query || 'error' in query) {
        return {
          result: [mutation.result],
          refetch: true,
        };
      }

      return {
        result: [...query.result, mutation.result],
        refetch: true,
      };
    },
  },
});

export const createObjectModel = CreateObjectForm.factory.createModel({
  $objectTypes: objectTypesQuery.$data,
  mutation: $mutation,
  redirectAfter: {
    route: routes.objects.home,
  },
});

import { attachOperation, update } from '@farfetched/core';
import { combine } from 'effector';

import { CreateObjectForm } from '~/features/objects/create';
import { selectOrganizationModel } from '~/features/organization/select-workspace';

import { objectsApi } from '~/shared/api/objects';
import { ObjectFormPayload } from '~/shared/forms/object';
import { routes } from '~/shared/router';
import { sessionModel } from '~/shared/session';

export const currentRoute = routes.objects.create;

export const $userId = sessionModel.$session.map((session) => session?.sub ?? null);
export const $currentOrganization = selectOrganizationModel.$selectedOrganizationId;

export const $mutation = attachOperation(objectsApi.createMutation, {
  source: combine({ organizationId: $currentOrganization, userId: $userId }),
  mapParams: (params: ObjectFormPayload, source): objectsApi.CreateObjectMutationParams => ({
    object: {
      ...params,
      organization_id: source.organizationId,
      owner_id: source.userId,
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
  mutation: $mutation,
  redirectAfter: {
    route: routes.objects.home,
  },
});

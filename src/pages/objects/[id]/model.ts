import { startChain } from '@farfetched/atomic-router';
import { attachOperation, update } from '@farfetched/core';
import { chainRoute } from 'atomic-router';

import { chainAuthenticated } from '~/features/authn/protected-routes';
import { EditObjectForm } from '~/features/objects/edit';

import { objectsApi } from '~/shared/api/objects';
import { ObjectFormPayload } from '~/shared/forms/object';
import { chainUuid } from '~/shared/lib/utils';
import { routes } from '~/shared/router';

export const currentRoute = routes.objects.edit;

export const idEnsuredRoute = chainUuid(currentRoute, 'id');

export const authenticatedRoute = chainAuthenticated(idEnsuredRoute);

export const query = attachOperation(objectsApi.queryById);

export const dataLoadedRoute = chainRoute({
  route: idEnsuredRoute,
  ...startChain(query),
});

export const $mutation = attachOperation(objectsApi.updateMutation, {
  source: query.$data,
  mapParams: (payload: ObjectFormPayload, source): objectsApi.UpdateObjectMutationParams => ({
    id: source?.id ?? '',
    object: payload,
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
        result: query.result.map((object) => {
          if (object.id === mutation.result.id) {
            return mutation.result;
          }

          return object;
        }),
        refetch: true,
      };
    },
  },
});

export const editObjectModel = EditObjectForm.factory.createModel({
  mutation: $mutation,
  $object: query.$data,
  redirectAfter: {
    route: routes.objects.home,
  },
});

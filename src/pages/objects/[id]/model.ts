import { startChain } from '@farfetched/atomic-router';
import { attachOperation, update } from '@farfetched/core';
import { chainRoute } from 'atomic-router';

import { chainAuthenticated } from '~/features/authn/protected-routes';
import { EditObjectForm } from '~/features/objects/edit';

import { objectTypesApi } from '~/shared/api/object-types';
import { objectsApi } from '~/shared/api/objects';
import { ObjectFormPayload } from '~/shared/forms/object';
import { chainUuid } from '~/shared/lib/utils';
import { routes } from '~/shared/router';

import { objectsListPageQuery } from '../list/model';

export const currentRoute = routes.objects.edit;

export const authenticatedRoute = chainAuthenticated(currentRoute);

export const idEnsuredRoute = chainUuid(authenticatedRoute, 'id');

const objectTypesQuery = attachOperation(objectTypesApi.query);
const objectQuery = attachOperation(objectsApi.queryById);

// 1. load object types
// 2. load object
export const dataLoadedRoute = chainRoute({
  route: chainRoute({
    route: authenticatedRoute,
    ...startChain(objectTypesQuery),
  }),
  ...startChain(objectQuery),
});

const $mutation = attachOperation(objectsApi.updateMutation, {
  source: objectQuery.$data,
  mapParams: (payload: ObjectFormPayload, source): objectsApi.UpdateObjectMutationParams => ({
    id: source?.id ?? '',
    object: payload,
  }),
});

update(objectsListPageQuery, {
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
  $objectTypes: objectTypesQuery.$data,
  mutation: $mutation,
  $object: objectQuery.$data,
  redirectAfter: {
    route: routes.objects.home,
  },
});

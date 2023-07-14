import { createEffect, createStore } from 'effector';

import { ObjectType, objectsApi } from '~/shared/api/objects';
import { Nullable } from '~/shared/lib/utils';

export const fetchObjectsFx = createEffect<
  {
    organizationId: Nullable<string>;
  },
  ObjectType[]
>(({ organizationId }) => objectsApi.objectsByOrganization(organizationId));

export const $objects = createStore<ObjectType[] | null>(null).on(fetchObjectsFx.doneData, (_, payload) => payload);

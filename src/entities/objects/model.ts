import { createEffect, createStore } from 'effector';

import { Object, objectsApi } from '~/shared/api/objects';
import { Nullable } from '~/shared/lib/utils';

const fetchObjectsFx = createEffect<
  {
    organizationId: Nullable<string>;
  },
  Object[]
>(({ organizationId }) => objectsApi.objectsByOrganization(organizationId));

const $objects = createStore<Object[] | null>(null).on(fetchObjectsFx.doneData, (_, payload) => payload);

export const objectsModel = {
  $objects,
  fetchObjectsFx,
};

import { createEffect, createStore } from 'effector';

import { objectsApi, ObjectType } from '~/shared/api/objects';

export const fetchObjectsFx = createEffect<void, ObjectType[]>(() => objectsApi.fetchObjects());

export const $objects = createStore<ObjectType[] | null>(null).on(fetchObjectsFx.doneData, (_, payload) => payload);

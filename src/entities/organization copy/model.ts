import { createStore, sample, createEffect } from 'effector';


import { objectsApi, ObjectType } from '~/shared/api/objects';
import { routes } from '~/shared/lib/router';

export const currentRoute = routes.home;

export const fetchObjectsFx = createEffect<void, ObjectType[]>(() => objectsApi.fetchObjects());

export const $objects = createStore<ObjectType[] | null>(null).on(
  fetchObjectsFx.doneData,
  (_, payload) => payload,
);

sample({
  clock: currentRoute.opened,
  target: fetchObjectsFx,
});

import { chainRoute } from 'atomic-router';
import { undefined } from 'zod';

import { chainAuthenticated } from '~/features/authn/protected-routes';

import { objectsModel } from '~/entities/objects';

import { routes } from '~/shared/lib/router';

export const currentRoute = routes.home;

export const authenticatedRoute = chainAuthenticated(currentRoute);

<<<<<<< HEAD
export type ObjectType = Database['public']['Tables']['objects']['Row'];

const fetchDataFx = createEffect<void, ObjectType[]>(async () => {
  const supabaseClient = await getAuthnSupabase();

  const { data } = await supabaseClient.from('objects').select();

  if (!data) {
    throw new Error('data is empty');
  }

  return data;
});

export const $data = createStore<ObjectType[]>([]).on(fetchDataFx.doneData, (_, payload) => payload);

sample({
  clock: authenticatedRoute.opened,
  target: fetchDataFx,
});
=======
export const dataLoadedRoute = chainRoute({
  route: authenticatedRoute,
  beforeOpen: {
    effect: objectsModel.fetchObjectsFx,
    mapParams: () => undefined,
  },
  openOn: objectsModel.fetchObjectsFx.doneData,
});

export const $data = objectsModel.$objects;
>>>>>>> master

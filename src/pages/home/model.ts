import { createEffect, createStore, sample } from 'effector';

import { chainAuthenticated } from '~/features/authn/protected-routes';

import { routes } from '~/shared/lib/router';
import { Database, getAuthnSupabase } from '~/shared/lib/supabase';

export const currentRoute = routes.home;

export const authenticatedRoute = chainAuthenticated(currentRoute);

export type Todo = Database['public']['Tables']['todo']['Row'];

const fetchDataFx = createEffect<void, Todo[]>(async () => {
  const supabaseClient = await getAuthnSupabase();

  const { data } = await supabaseClient.from('todo').select();

  if (!data) {
    throw new Error('data is empty');
  }

  return data;
});

export const $data = createStore<Todo[]>([]).on(fetchDataFx.doneData, (_, payload) => payload);

sample({
  clock: authenticatedRoute.opened,
  target: fetchDataFx,
});

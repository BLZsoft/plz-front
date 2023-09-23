import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { attach, createEffect, createStore, sample } from 'effector';

import { LogtoResource, fetchResourceTokenFx } from '~/shared/lib/logto';
import { sessionModel } from '~/shared/session';

import { Database } from '../database.types';

import { SUPABASE_ANON_KEY, SUPABASE_URL } from './config';
import { $token, $tokenExpiration, tokenChanged } from './token';

export const $supabaseClient = createStore<SupabaseClient<Database> | null>(null, {
  serialize: 'ignore',
});

export const setupSupabaseFx = createEffect((token: string | null) => {
  if (!token) {
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });
});

export const fetchTokenFx = attach({
  source: $supabaseClient,
  effect: createEffect(async (supabaseClient: SupabaseClient<Database> | null) => {
    if (!supabaseClient) throw new Error('Supabase client is not initialized');

    const resourceToken = await fetchResourceTokenFx(LogtoResource.Supabase);

    const { data: token } = await supabaseClient.functions.invoke<string>('exchangeToken', {
      headers: {
        Authorization: `Bearer ${resourceToken}`,
      },
    });

    return token;
  }),
});

export const ensureTokenFx = attach({
  source: { session: sessionModel.$session, token: $token, expiration: $tokenExpiration },
  effect: createEffect(async ({ session, token, expiration }) => {
    if (!session) {
      return null;
    }

    const valid = expiration && expiration < Date.now() / 1000;

    if (!valid) {
      const newToken = await fetchTokenFx();
      return newToken;
    }

    console.log('token:', token);

    return token;
  }),
});

sample({ clock: tokenChanged, target: setupSupabaseFx });

sample({ clock: setupSupabaseFx.doneData, target: $supabaseClient });

sample({
  clock: ensureTokenFx.doneData,
  source: $token,
  filter: (oldToken, newToken) => newToken !== oldToken,
  fn: (_, newToken) => newToken,
  target: tokenChanged,
});

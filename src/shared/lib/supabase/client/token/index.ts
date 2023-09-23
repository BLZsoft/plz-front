import { zodContract } from '@farfetched/zod';
import { createEvent, createStore, sample } from 'effector';
import { Done, persist } from 'effector-storage/local';
import { z } from 'zod';

import { appStarted } from '~/shared/lifecycle';

import { parse } from './parse';

export const STORAGE_KEY = 'supabaseToken';

export const $token = createStore<string | null>(null);

export const $parsedToken = $token.map(parse);

export const $tokenExpiration = $parsedToken.map((t) => t?.exp ?? null);

export const tokenLoadRequested = createEvent();
const persistDone = createEvent<Done<string>>();
export const tokenLoaded = createEvent<string | null>();

export const tokenChanged = createEvent<string | null>();

sample({ clock: appStarted, target: tokenLoadRequested });

persist({
  store: $token,
  key: STORAGE_KEY,
  pickup: tokenLoadRequested,
  done: persistDone,
  contract: zodContract(z.string().nonempty().nullable()),
});

sample({
  clock: persistDone,
  filter: ({ operation }) => operation === 'get',
  fn: ({ value }) => value,
  target: tokenLoaded,
});

sample({ clock: tokenLoaded, target: tokenChanged });

sample({ clock: tokenChanged, target: $token });

import { createEffect, createStore, sample } from 'effector';

import { Profile, profileApi } from '~/shared/api/profile';
import { appStarted } from '~/shared/lib/lifecycle';

export const fetchUserInfoFx = createEffect<void, Profile>(() => profileApi.fetchProfile());

export const $viewer = createStore<Profile | null>(null)
  .on(fetchUserInfoFx.doneData, (_, data) => data)
  .on(fetchUserInfoFx.failData, () => null);

export const $isLoading = fetchUserInfoFx.pending;

sample({
  clock: appStarted,
  target: fetchUserInfoFx,
});

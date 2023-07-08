import { UserInfoResponse } from '@logto/browser';
import { createEffect, createStore, sample } from 'effector';

import { appStarted } from '~/shared/lib/lifecycle';
import { logtoClient } from '~/shared/lib/logto';

export type Viewer = UserInfoResponse | null;

export const fetchUserInfoFx = createEffect<void, Viewer>(() => logtoClient.fetchUserInfo());

export const $viewer = createStore<UserInfoResponse | null>(null).on(fetchUserInfoFx.doneData, (_, data) => data);
export const $isAuthenticated = $viewer.map((data) => data !== null);

sample({
  clock: appStarted,
  target: fetchUserInfoFx,
});

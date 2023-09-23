import { createEffect, sample } from 'effector';

import { viewerModel } from '~/entities/viewer';

import { logtoClient } from '~/shared/lib/logto';

const baseUrl = window.location.origin

export const signOutFx = createEffect(() => logtoClient.signOut(baseUrl + '/'));

sample({
  clock: signOutFx.done,
  fn: () => null,
  target: viewerModel.$viewer,
});

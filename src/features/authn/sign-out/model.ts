import { createEffect, sample } from 'effector';

import { viewerModel } from '~/entities/viewer';

import { baseUrl } from '~/shared/config/base-url';
import { logtoClient } from '~/shared/lib/logto';

export const signOutFx = createEffect(() => logtoClient.signOut(baseUrl + '/'));

sample({
  clock: signOutFx.done,
  fn: () => null,
  target: viewerModel.$viewer,
});

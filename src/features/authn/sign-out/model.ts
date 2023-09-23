import { createEffect, sample } from 'effector';

import { logtoClient } from '~/shared/lib/logto';
import { sessionModel } from '~/shared/session';

const baseUrl = window.location.origin;

export const signOutFx = createEffect(() => logtoClient.signOut(baseUrl + '/'));

sample({
  clock: signOutFx.done,
  fn: () => null,
  target: sessionModel.$session,
});

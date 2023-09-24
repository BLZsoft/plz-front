import { attach, createEffect } from 'effector';

import { $logtoClient } from '~/shared/lib/logto';

export const signInFx = attach({
  source: $logtoClient,
  effect: createEffect(async (logtoClient) => {
    const baseUrl = window.location.origin;

    await logtoClient.signIn(baseUrl + '/logto/callback');
  }),
});

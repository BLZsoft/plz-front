import { attach, createEffect, sample } from 'effector';

import { $logtoClient, chainLogtoClient } from '~/shared/lib/logto';
import { routes } from '~/shared/router';

export const route = routes.logto.callback;

export const logtoRoute = chainLogtoClient(route);

export const handleCallbackFx = attach({
  source: $logtoClient,
  effect: createEffect(async (logtoClient) => {
    const currentPageUrl = window.location.href;

    await logtoClient.handleSignInCallback(currentPageUrl);
  }),
});

sample({
  clock: logtoRoute.opened,
  target: handleCallbackFx,
});

sample({
  clock: handleCallbackFx.doneData,
  filter: logtoRoute.$isOpened,
  target: routes.home.open,
});

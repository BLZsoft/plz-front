import { attach, createEffect, sample } from 'effector';

import { $logtoClient, chainLogtoClient } from '~/shared/lib/logto';
import { routes } from '~/shared/router';

export const route = routes.logto.callback;

export const logtoClientRoute = chainLogtoClient(route);

export const handleCallbackFx = attach({
  source: $logtoClient,
  effect: createEffect(async (logtoClient) => {
    const currentPageUrl = window.location.href;

    await logtoClient.handleSignInCallback(currentPageUrl);
  }),
});

sample({
  clock: logtoClientRoute.opened,
  target: handleCallbackFx,
});

sample({
  clock: handleCallbackFx.doneData,
  filter: logtoClientRoute.$isOpened,
  target: routes.home.open,
});

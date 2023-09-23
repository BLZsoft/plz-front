import { createEffect, sample } from 'effector';

import { logtoClient } from '~/shared/lib/logto';
import { routes } from '~/shared/lib/router';

export const route = routes.logto.callback;

export const handleCallbackFx = createEffect(async () => {
  const currentPageUrl = window.location.href;

  try {
    await logtoClient.handleSignInCallback(currentPageUrl);
  } catch (error) {
    console.error('handleCallbackFx', error);
  } finally {
    await routes.home.open();
  }
});

sample({
  clock: route.opened,
  target: handleCallbackFx,
});

sample({
  clock: handleCallbackFx.doneData,
  target: routes.home.open,
});

import { createEffect, sample } from 'effector';

import { viewerModel } from '~/entities/viewer';

import { logtoClient } from '~/shared/lib/logto';
import { routes } from '~/shared/lib/router';

export const route = routes.logto.callback;

export const handleCallbackFx = createEffect(async () => {
  const currentPageUrl = window.location.href;

  await logtoClient.handleSignInCallback(currentPageUrl);
  await routes.home.open();
});

sample({
  clock: route.opened,
  target: handleCallbackFx,
});

sample({
  clock: handleCallbackFx.doneData,
  target: viewerModel.fetchUserInfoFx,
});

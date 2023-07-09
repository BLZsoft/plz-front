import { chainRoute, RouteInstance, RouteParams, RouteParamsAndQuery } from 'atomic-router';
import { createEvent, sample } from 'effector';

import { signInFx } from '~/features/authn/sign-in';

import { viewerModel } from '~/entities/viewer';

export function chainAuthenticated<Params extends RouteParams>(route: RouteInstance<Params>) {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();

  // 1. При открытии роута проверяем сессию
  sample({
    clock: sessionCheckStarted,
    target: viewerModel.fetchUserInfoFx,
  });

  // 2. Сессия отсутствует - инициализируем процесс входа, но только если всё еще на странице
  sample({
    clock: viewerModel.fetchUserInfoFx.failData,
    filter: route.$isOpened,
    target: signInFx,
  });

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [viewerModel.fetchUserInfoFx.doneData],
  });
}

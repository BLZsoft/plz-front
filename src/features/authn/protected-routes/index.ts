import { chainRoute, RouteInstance, RouteParams, RouteParamsAndQuery } from 'atomic-router';
import { createEvent, sample, split } from 'effector';
import { empty, not } from 'patronum';

import { signInFx } from '~/features/authn/sign-in';

import { sessionModel } from '~/shared/session';

export function chainAuthenticated<Params extends RouteParams>(route: RouteInstance<Params>) {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();

  const sessionSuccess = createEvent();

  // 1. При открытии роута проверяем сессию. Если есть - открываем сразу, если нет - запрашиваем ещё раз.
  split({
    clock: sessionCheckStarted,
    source: not(empty(sessionModel.$session)),
    match: {
      authorized: (s) => s,
      unauthorzied: (s) => !s,
    },
    cases: {
      authorized: sessionSuccess,
      unauthorzied: sessionModel.fetchSessionFx,
    },
  });

  // 2. Получили сессию - открываем роут, но только если ещё на странице
  sample({
    clock: sessionModel.fetchSessionFx.doneData,
    filter: route.$isOpened,
    target: sessionSuccess,
  });

  // 3. Сессия отсутствует - инициализируем процесс входа, но только если еще на странице
  sample({
    clock: sessionModel.fetchSessionFx.failData,
    filter: route.$isOpened,
    target: signInFx,
  });

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: sessionSuccess,
  });
}

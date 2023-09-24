import { chainRoute, RouteInstance, RouteParams, RouteParamsAndQuery } from 'atomic-router';
import { createEvent, sample } from 'effector';
import { condition, empty, not } from 'patronum';

import { signInFx } from '~/features/authn/sign-in';

import { chainLogtoClient } from '~/shared/lib/logto';
import { sessionModel } from '~/shared/session';

export function chainAuthenticated<Params extends RouteParams>(route: RouteInstance<Params>) {
  const logtoRoute = chainLogtoClient(route);

  const checkStarted = createEvent<RouteParamsAndQuery<Params>>();

  const checkSuccess = createEvent();

  condition({
    source: checkStarted,
    if: not(empty(sessionModel.$session)),
    then: checkSuccess,
    else: condition({
      source: sessionModel.fetchSessionFx,
      if: not(sessionModel.fetchSessionFx.pending),
      then: sessionModel.fetchSessionFx,
    }),
  });

  // 2. Получили сессию - открываем роут, но только если ещё на странице
  sample({
    clock: sessionModel.fetchSessionFx.doneData,
    filter: route.$isOpened,
    target: checkSuccess,
  });

  // 3. Сессия отсутствует - инициализируем процесс входа, но только если еще на странице
  sample({
    clock: sessionModel.fetchSessionFx.failData,
    filter: route.$isOpened,
    target: signInFx,
  });

  return chainRoute({
    route: logtoRoute,
    beforeOpen: checkStarted,
    openOn: checkSuccess,
  });
}

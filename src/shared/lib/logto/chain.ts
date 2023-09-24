import { RouteInstance, RouteParams, RouteParamsAndQuery, chainRoute } from 'atomic-router';
import { createEvent, sample } from 'effector';
import { condition, empty, not } from 'patronum';

import { $logtoClient } from '~/shared/lib/logto';

import { setupLogtoClientFx } from './logto';

export function chainLogtoClient<Params extends RouteParams>(route: RouteInstance<Params>) {
  const checkStarted = createEvent<RouteParamsAndQuery<Params>>();

  const checkSuccess = createEvent();
  const checkFailed = createEvent();

  // Если клиент уже инициализирован - открываем роут
  // Иначе, если не ждём инициализации - просим инициализировать
  condition({
    source: checkStarted,
    if: not(empty($logtoClient)),
    then: checkSuccess,
    else: condition({
      source: setupLogtoClientFx,
      if: not(setupLogtoClientFx.pending),
      then: setupLogtoClientFx,
    }),
  });

  // Если инициализировали и всё ещё на странице - открываем
  sample({
    clock: setupLogtoClientFx.doneData,
    filter: route.$isOpened,
    target: checkSuccess,
  });

  // Если инициализация провалилась и всё ещё на странице - отменяем
  sample({
    clock: setupLogtoClientFx.failData,
    filter: route.$isOpened,
    target: checkFailed,
  });

  return chainRoute({
    route,
    beforeOpen: checkStarted,
    openOn: checkSuccess,
    cancelOn: checkFailed,
  });
}

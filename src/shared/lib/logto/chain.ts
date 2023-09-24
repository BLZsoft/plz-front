import { RouteInstance, RouteParams, RouteParamsAndQuery, chainRoute } from 'atomic-router';
import { createEvent, sample } from 'effector';
import { not } from 'patronum';

import { $logtoClient } from '~/shared/lib/logto';

import { setupLogtoClientFx } from './logto';

export function chainLogtoClient<Params extends RouteParams>(route: RouteInstance<Params>) {
  const logtoClientCheckStarted = createEvent<RouteParamsAndQuery<Params>>();

  const logtoClientCheckedSuccess = createEvent();

  sample({
    clock: logtoClientCheckStarted,
    filter: not(setupLogtoClientFx.pending),
    target: setupLogtoClientFx,
  });

  sample({
    clock: $logtoClient.updates,
    filter: (client) => client !== null,
    target: logtoClientCheckedSuccess,
  });

  return chainRoute({
    route,
    beforeOpen: logtoClientCheckStarted,
    openOn: logtoClientCheckedSuccess,
  });
}

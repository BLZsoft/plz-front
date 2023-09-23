import { RouteInstance, RouteParams, RouteParamsAndQuery, chainRoute } from 'atomic-router';
import { createEvent, split } from 'effector';
import { z } from 'zod';

export function chainUuid<Params extends RouteParams>(route: RouteInstance<Params>, paramName: keyof Params) {
  const paramCheckStarted = createEvent<RouteParamsAndQuery<Params>>();

  const paramCheckSuccess = createEvent();
  const paramCheckFailed = createEvent();

  // TODO: refactor
  split({
    source: paramCheckStarted,
    match: {
      matched: ({ params }) => z.string().uuid().safeParse(params[paramName]).success,
      unmatched: ({ params }) => !z.string().uuid().safeParse(params[paramName]).success,
    },
    cases: {
      matched: paramCheckSuccess,
      unmatched: paramCheckFailed,
    },
  });

  return chainRoute({
    route,
    beforeOpen: paramCheckStarted,
    openOn: paramCheckSuccess,
    cancelOn: paramCheckFailed,
  });
}

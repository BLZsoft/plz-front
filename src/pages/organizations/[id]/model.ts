import { chainRoute, RouteInstance, RouteParamsAndQuery } from 'atomic-router';
import { combine, createEffect, createEvent, createStore, sample } from 'effector';

import { organizationsModel } from '~/entities/organizations';
import { viewerModel } from '~/entities/viewer';

import { Membership, organizationsApi } from '~/shared/api/organizations';
import { routes } from '~/shared/lib/router';

export const currentRoute = routes.organizations.details;

export const $organization = combine(
  routes.organizations.details.$params,
  organizationsModel.$availableOrganizations,
  ({ organizationId }, organizations) => organizations.find((org) => org.id === organizationId),
);

const requestMembersFx = createEffect<string, Membership[]>((organizationId) =>
  organizationsApi.fetchMembers(organizationId),
);

export const $members = createStore<Membership[] | null>(null)
  .on(requestMembersFx.doneData, (_, payload) => payload)
  .on(requestMembersFx.failData, () => null);

export const $role = combine(
  {
    viewer: viewerModel.$viewer,
    members: $members,
  },
  ({ viewer, members }) => members?.find((m) => m.user_id === viewer?.sub)?.role ?? null,
);

export const dataLoadedRoute = (<Params extends { organizationId: string }>(route: RouteInstance<Params>) => {
  const dataRequested = createEvent<RouteParamsAndQuery<Params>>();

  sample({
    clock: dataRequested,
    fn: ({ params }) => params.organizationId,
    target: requestMembersFx,
  });

  return chainRoute({
    route: route,
    beforeOpen: dataRequested,
    openOn: requestMembersFx.doneData,
  });
})(currentRoute);

import { chainRoute, RouteInstance, RouteParamsAndQuery } from 'atomic-router';
import { combine, createEffect, createEvent, createStore, sample } from 'effector';

import { organizationsModel } from '~/entities/organizations';
import { viewerModel } from '~/entities/viewer';

import { MemberData, Membership, organizationsApi } from '~/shared/api/organizations';
import { usersApi } from '~/shared/api/users';
import { routes } from '~/shared/lib/router';

export const currentRoute = routes.organizations.details;

export const $organization = combine(
  routes.organizations.details.$params,
  organizationsModel.$availableOrganizations,
  ({ organizationId }, organizations) => organizations.find((org) => org.id === organizationId),
);

const requestMembershipsFx = createEffect<string, Membership[]>((organizationId) =>
  organizationsApi.fetchMemberships(organizationId),
);

const requestMembersDataFx = createEffect<Membership[], MemberData[]>((memberships) =>
  Promise.all(
    memberships.map((m) =>
      usersApi.getUserByFields({ id: m.user_id }).then((r) => ({
        ...r[0],
        role: m.role,
      })),
    ),
  ),
);

sample({
  source: requestMembershipsFx.doneData,
  target: requestMembersDataFx,
});

export const $members = createStore<MemberData[] | null>(null)
  .on(requestMembersDataFx.doneData, (_, payload) => payload)
  .on(requestMembersDataFx.failData, () => null);

$members.watch((v) => console.log(v));

export const $role = combine(
  {
    viewer: viewerModel.$viewer,
    members: $members,
  },
  ({ viewer, members }) => members?.find((m) => m.id === viewer?.sub)?.role ?? null,
);

export const dataLoadedRoute = (<Params extends { organizationId: string }>(route: RouteInstance<Params>) => {
  const dataRequested = createEvent<RouteParamsAndQuery<Params>>();

  sample({
    clock: dataRequested,
    fn: ({ params }) => params.organizationId,
    target: requestMembershipsFx,
  });

  return chainRoute({
    route: route,
    beforeOpen: dataRequested,
    openOn: requestMembersDataFx.doneData,
  });
})(currentRoute);

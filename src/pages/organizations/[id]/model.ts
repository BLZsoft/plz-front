import { chainRoute, RouteInstance, RouteParamsAndQuery } from 'atomic-router';
import { combine, createEvent, sample } from 'effector';

import { organizationMembersModel } from '~/entities/organization-members';
import { organizationsModel } from '~/entities/organizations';

import { routes } from '~/shared/router';
import { sessionModel } from '~/shared/session';

export const currentRoute = routes.organizations.details;

export const $organization = combine(
  routes.organizations.details.$params,
  organizationsModel.$availableOrganizations,
  ({ id }, organizations) => organizations?.find((org) => org.id === id),
);

export const $role = combine(
  {
    viewer: sessionModel.$session,
    members: organizationMembersModel.$members,
  },
  ({ viewer, members }) => members?.find((m) => m.id === viewer?.sub)?.role ?? null,
);

export const dataLoadedRoute = (<Params extends { id: string }>(route: RouteInstance<Params>) => {
  const dataRequested = createEvent<RouteParamsAndQuery<Params>>();

  sample({
    clock: dataRequested,
    fn: ({ params }) => params.id,
    target: organizationMembersModel.requestMembershipsFx,
  });

  return chainRoute({
    route: route,
    beforeOpen: dataRequested,
    openOn: organizationMembersModel.requestMembersDataFx.doneData,
    cancelOn: [currentRoute.updated],
  });
})(currentRoute);

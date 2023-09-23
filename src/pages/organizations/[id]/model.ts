import { chainRoute, RouteInstance, RouteParamsAndQuery } from 'atomic-router';
import { combine, createEvent, sample } from 'effector';

import { organizationMembersModel } from '~/entities/organization-members';
import { organizationsModel } from '~/entities/organizations';
import { viewerModel } from '~/entities/viewer';

import { routes } from '~/shared/router';

export const currentRoute = routes.organizations.details;

export const $organization = combine(
  routes.organizations.details.$params,
  organizationsModel.$availableOrganizations,
  ({ organizationId }, organizations) => organizations.find((org) => org.id === organizationId),
);

export const $role = combine(
  {
    viewer: viewerModel.$viewer,
    members: organizationMembersModel.$members,
  },
  ({ viewer, members }) => members?.find((m) => m.id === viewer?.sub)?.role ?? null,
);

export const dataLoadedRoute = (<Params extends { organizationId: string }>(route: RouteInstance<Params>) => {
  const dataRequested = createEvent<RouteParamsAndQuery<Params>>();

  sample({
    clock: dataRequested,
    fn: ({ params }) => params.organizationId,
    target: organizationMembersModel.requestMembershipsFx,
  });

  return chainRoute({
    route: route,
    beforeOpen: dataRequested,
    openOn: organizationMembersModel.requestMembersDataFx.doneData,
    cancelOn: [currentRoute.updated],
  });
})(currentRoute);

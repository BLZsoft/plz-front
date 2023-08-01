import { combine } from 'effector';

import { organizationsModel } from '~/entities/organizations';

import { routes } from '~/shared/lib/router';

export const currentRoute = routes.organizations.details;

export const $organization = combine(
  routes.organizations.details.$params,
  organizationsModel.$availableOrganizations,
  ({ organizationId }, organizations) => organizations.find((org) => org.id === organizationId),
);

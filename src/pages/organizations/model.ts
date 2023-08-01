import { chainRoute } from 'atomic-router';
import { undefined } from 'zod';

import { chainAuthenticated } from '~/features/authn/protected-routes';

import { organizationsModel } from '~/entities/organizations';

import { routes } from '~/shared/lib/router';

export const currentRoute = routes.organizations.root;

export const authenticatedRoute = chainAuthenticated(currentRoute);

export const dataLoadedRoute = chainRoute({
  route: authenticatedRoute,
  beforeOpen: {
    effect: organizationsModel.getAvailableOrganizationsFx,
    mapParams: () => undefined,
  },
  openOn: organizationsModel.getAvailableOrganizationsFx.doneData,
});

export const $data = organizationsModel.$availableOrganizations;

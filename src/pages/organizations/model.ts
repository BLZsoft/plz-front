import { chainAuthenticated } from '~/features/authn/protected-routes';

import { organizationsModel } from '~/entities/organizations';

import { routes } from '~/shared/router';

export const currentRoute = routes.organizations.root;

export const authenticatedRoute = chainAuthenticated(currentRoute);

export const $data = organizationsModel.$availableOrganizations;

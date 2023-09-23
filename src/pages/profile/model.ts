import { chainAuthenticated } from '~/features/authn/protected-routes';

import { viewerModel } from '~/entities/viewer';

import { routes } from '~/shared/router';

export const currentRoute = routes.profile;

export const authenticatedRoute = chainAuthenticated(currentRoute);

export const $defaultValues = viewerModel.$viewer.map(
  (v) =>
    v && {
      username: v.username,
      name: v.name,
      primaryEmail: v.email,
      primaryPhone: v.phone_number,
    },
);

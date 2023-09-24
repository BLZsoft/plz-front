import { chainAuthenticated } from '~/features/authn/protected-routes';

import { routes } from '~/shared/router';
import { sessionModel } from '~/shared/session';

export const currentRoute = routes.profile;

export const authenticatedRoute = chainAuthenticated(currentRoute);

export const $defaultValues = sessionModel.$session.map(
  (v) =>
    v && {
      username: v.username,
      name: v.name,
      primaryEmail: v.email,
      primaryPhone: v.phone_number,
    },
);

import { chainRoute } from 'atomic-router';
import { undefined } from 'zod';

import { chainAuthenticated } from '~/features/authn/protected-routes';

import { objectsModel } from '~/entities/objects';

import { routes } from '~/shared/lib/router';

export const currentRoute = routes.home;

export const authenticatedRoute = chainAuthenticated(currentRoute);

export const dataLoadedRoute = chainRoute({
  route: authenticatedRoute,
  beforeOpen: {
    effect: objectsModel.fetchObjectsFx,
    mapParams: () => undefined,
  },
  openOn: objectsModel.fetchObjectsFx.doneData,
});

export const $data = objectsModel.$objects;

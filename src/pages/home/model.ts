import { chainRoute, RouteParams, RouteParamsAndQuery } from 'atomic-router';
import { createEvent, sample } from 'effector';

import { chainAuthenticated } from '~/features/authn/protected-routes';
import { selectOrganizationModel } from '~/features/organization/select-workspace';

import { objectsModel } from '~/entities/objects';

import { routes } from '~/shared/lib/router';

export const currentRoute = routes.home.root;

export const authenticatedRoute = chainAuthenticated(currentRoute);

const dataLoadStarted = createEvent<RouteParamsAndQuery<RouteParams>>();

sample({
  clock: dataLoadStarted,
  source: selectOrganizationModel.$selectedOrganizationId,
  fn: (id) => ({ organizationId: id }),
  target: objectsModel.fetchObjectsFx,
});

export const dataLoadedRoute = chainRoute({
  route: authenticatedRoute,
  beforeOpen: dataLoadStarted,
  openOn: objectsModel.fetchObjectsFx.doneData,
});

sample({
  source: selectOrganizationModel.$selectedOrganizationId,
  filter: currentRoute.$isOpened,
  fn: (id) => ({ organizationId: id }),
  target: objectsModel.fetchObjectsFx,
});

export const $data = objectsModel.$objects;

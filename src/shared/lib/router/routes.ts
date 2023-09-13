import { createRoute, redirect } from 'atomic-router';

export const routes = {
  home: createRoute(),
  profile: createRoute(),
  objects: {
    root: createRoute(),
    home: createRoute(),
    create: createRoute(),
    details: createRoute<{ objectId: string }>(),
  },
  organizations: {
    root: createRoute(),
    home: createRoute(),
    create: createRoute(),
    details: createRoute<{ organizationId: string }>(),
  },
  logto: {
    callback: createRoute(),
  },
};

redirect({
  clock: routes.home.opened,
  route: routes.objects.home,
});

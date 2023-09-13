import { createRoute } from 'atomic-router';

export const routes = {
  home: {
    root: createRoute(),
    create: createRoute(),
    details: createRoute<{ objectId: string }>(),
  },
  profile: createRoute(),
  object: createRoute(),
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

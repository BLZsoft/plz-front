import { createRoute } from 'atomic-router';

export const routes = {
  home: createRoute(),
  profile: createRoute(),
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

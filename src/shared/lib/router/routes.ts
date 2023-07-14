import { createRoute } from 'atomic-router';

export const routes = {
  home: createRoute(),
  profile: createRoute(),
  organizations: createRoute(),
  organizationDetailsPage: createRoute<{ organizationId: string }>(),
  logto: {
    callback: createRoute(),
  },
};

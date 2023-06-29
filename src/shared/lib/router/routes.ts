import { createRoute } from 'atomic-router';

export const routes = {
  home: createRoute(),
  profile: createRoute(),
  logto: {
    callback: createRoute(),
  },
};

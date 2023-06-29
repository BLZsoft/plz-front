import { createHistoryRouter } from 'atomic-router';
import { sample } from 'effector';
import { createBrowserHistory } from 'history';

import { appStarted } from '~/shared/lib/lifecycle';

import { controls } from './controls';
import { routes } from './routes';

export const router = createHistoryRouter({
  routes: [
    {
      path: '/',
      route: routes.home,
    },
    {
      path: '/profile',
      route: routes.profile,
    },
    {
      path: '/logto/callback',
      route: routes.logto.callback,
    },
  ],
  controls,
});

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});

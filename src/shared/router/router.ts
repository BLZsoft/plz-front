import { createHistoryRouter } from 'atomic-router';
import { sample } from 'effector';
import { createBrowserHistory } from 'history';

import { appStarted } from '~/shared/lifecycle';

import { controls } from './controls';
import { routesMap } from './routes-map';

export const router = createHistoryRouter({
  routes: routesMap,
  controls,
});

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});

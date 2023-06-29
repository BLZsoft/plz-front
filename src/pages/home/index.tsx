import { reflect } from '@effector/reflect';

import { Layout } from '~/pages/layout';

import { $data, currentRoute } from './model';
import { HomePageView } from './view';

const Page = reflect({
  view: HomePageView,
  bind: {
    data: $data,
  },
});

export const HomePage = {
  route: currentRoute,
  view: Page,
  layout: Layout,
};

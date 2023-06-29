import { createRoutesView } from 'atomic-router-react';

import { AnotherPage } from './another';
import { HomePage } from './home';
import { Layout } from './layout.tsx';

export const Pages = createRoutesView({
  routes: [HomePage, AnotherPage].map((r) => ({ ...r, layout: Layout })),
});

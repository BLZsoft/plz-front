import { createRoutesView } from 'atomic-router-react';

import { HomePage } from './home';
import { LogtoCallbackPage } from './logto/callback';

export const Pages = createRoutesView({
  routes: [HomePage, LogtoCallbackPage],
});

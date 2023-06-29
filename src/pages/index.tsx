import { createRoutesView } from 'atomic-router-react';

import { ProfilePage } from '~/pages/profile';

import { HomePage } from './home';
import { LogtoCallbackPage } from './logto/callback';

export const Pages = createRoutesView({
  routes: [HomePage, ProfilePage, LogtoCallbackPage],
});

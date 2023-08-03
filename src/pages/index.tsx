import { createRoutesView } from 'atomic-router-react';

import { HomePage } from './home';
import { LogtoCallbackPage } from './logto/callback';
import { OrganizationsRoot } from './organizations';
import { ProfilePage } from './profile';

export const Pages = createRoutesView({
  routes: [HomePage, ProfilePage, OrganizationsRoot, LogtoCallbackPage],
});

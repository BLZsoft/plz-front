import { createRoutesView } from 'atomic-router-react';

import { HomePage } from './home';
import { LogtoCallbackPage } from './logto/callback';
import { OrganizationsPage } from './organizations';
import { ProfilePage } from './profile';

export const Pages = createRoutesView({
  routes: [HomePage, ProfilePage, OrganizationsPage, LogtoCallbackPage],
});

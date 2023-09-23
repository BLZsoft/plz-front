import { createRoutesView } from 'atomic-router-react';

import { LogtoCallbackPage } from './logto/callback';
import { ObjectsPage } from './objects';
import { OrganizationsRoot } from './organizations';
import { ProfilePage } from './profile';

export const Pages = createRoutesView({
  routes: [ObjectsPage, ProfilePage, OrganizationsRoot, LogtoCallbackPage],
});

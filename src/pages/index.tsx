import { createRoutesView } from 'atomic-router-react';

import { CalculatorsPage } from './calculators';
import { LogtoCallbackPage } from './logto/callback';
import { ObjectsPage } from './objects';
import { OrganizationsRoot } from './organizations';
import { ProfilePage } from './profile';

export const Pages = createRoutesView({
  routes: [ObjectsPage, CalculatorsPage, ProfilePage, OrganizationsRoot, LogtoCallbackPage],
});

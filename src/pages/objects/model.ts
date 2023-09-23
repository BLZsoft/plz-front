
import { chainAuthenticated } from '~/features/authn/protected-routes';


import { routes } from '~/shared/router';

// TODO: supabase query with update on mutation
export const currentRoute = routes.objects.root;

export const authenticatedRoute = chainAuthenticated(currentRoute);

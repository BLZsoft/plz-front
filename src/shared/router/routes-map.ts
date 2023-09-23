import { routes } from './routes';

export const routesMap = [
  {
    path: '/',
    route: routes.home,
  },
  {
    path: '/profile',
    route: routes.profile,
  },
  {
    path: '/objects',
    route: [routes.objects.root, routes.objects.home],
  },
  {
    path: '/objects/create',
    route: [routes.objects.root, routes.objects.create],
  },
  {
    path: '/objects/:objectId',
    route: [routes.objects.root, routes.objects.edit],
  },
  {
    path: '/organizations',
    route: [routes.organizations.root, routes.organizations.home],
  },
  {
    path: '/organizations/create',
    route: [routes.organizations.root, routes.organizations.create],
  },
  {
    path: '/organizations/:organizationId',
    route: [routes.organizations.root, routes.organizations.details],
  },
  {
    path: '/logto/callback',
    route: routes.logto.callback,
  },
];

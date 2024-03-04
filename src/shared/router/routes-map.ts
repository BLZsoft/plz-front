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
    path: '/objects/:id',
    route: [routes.objects.root, routes.objects.edit],
  },
  {
    path: '/objects/create',
    route: [routes.objects.root, routes.objects.create],
  },
  {
    path: '/objects/:objectId/calculators',
    route: [routes.calculators.root, routes.calculators.home],
  },
  {
    path: '/objects/:objectId/calculators/03-fire-resistance-limit-building-structures',
    route: [routes.calculators.root, routes.calculators.fireResistanceLimitBuildingStructures03],
  },
  {
    path: '/objects/:objectId/calculators/04-wecs',
    route: [routes.calculators.root, routes.calculators.wecs04],
  },
  {
    path: '/objects/:objectId/calculators/05-minimal-distance',
    route: [routes.calculators.root, routes.calculators.minimalDistance05],
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
    path: '/organizations/:id',
    route: [routes.organizations.root, routes.organizations.details],
  },
  {
    path: '/logto/callback',
    route: routes.logto.callback,
  },
];

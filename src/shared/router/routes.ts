import { createRoute, redirect } from 'atomic-router';

export const routes = {
  home: createRoute(),
  profile: createRoute(),
  objects: {
    root: createRoute(),
    home: createRoute(),
    create: createRoute(),
    edit: createRoute<{ id: string }>(),
  },
  organizations: {
    root: createRoute(),
    home: createRoute(),
    create: createRoute(),
    details: createRoute<{ id: string }>(),
  },
  calculators: {
    root: createRoute<{ objectId: string }>(),
    home: createRoute<{ objectId: string }>(),
    fireResistanceLimitBuildingStructures03: createRoute<{ objectId: string }>(),
    // СОУЭ - Система оповещения и управления эвакуацией
    // WEACS - Warning and evacuation control system
    wecs04: createRoute<{ objectId: string }>(),
    minimalDistance05: createRoute<{ objectId: string }>(),
  },
  logto: {
    callback: createRoute(),
  },
};

redirect({
  clock: routes.home.opened,
  route: routes.objects.home,
});

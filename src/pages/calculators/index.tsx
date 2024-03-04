import { reflect } from '@effector/reflect';
import { createRoutesView, createRouteView } from 'atomic-router-react';

import { Layout } from '~/pages/layout';

import { CalculatorFireResistanceLimitBuildingStructures03Page } from './03-fire-resistance-limit-building-structures';
import { CalculatorsWecs04Page } from './04-wecs';
import { CalculatorMinimalDistance05Page } from './05-minimal-distance';
import { CalculatorsListPage } from './list';
import { currentRoute } from './model';
import { CalculatorsRootPageLoad, CalculatorsRootPageView } from './view';

const ChildRoutes = createRoutesView({
  routes: [
    CalculatorsListPage,
    CalculatorFireResistanceLimitBuildingStructures03Page,
    CalculatorsWecs04Page,
    CalculatorMinimalDistance05Page,
  ],
  otherwise() {
    return (
      <div className="flex flex-col items-center">
        <span className="text-2xl text-red-800">Not found.</span>
        <span className="mt-8 text-xl">Edit me here.</span>
        <code className="text-lg font-bold">pages/calculators/index.tsx</code>
      </div>
    );
  },
});

export const CalculatorsPage = {
  route: currentRoute,
  view: createRouteView({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error проблема с типами
    route: currentRoute,
    view: reflect({
      view: CalculatorsRootPageView,
      bind: {
        ChildRoutes,
      },
    }),
    otherwise: CalculatorsRootPageLoad,
  }),
  layout: Layout,
};

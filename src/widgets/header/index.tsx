import { reflect } from '@effector/reflect';

import { viewerModel } from '~/entities/viewer';

import { HeaderView, HeaderViewProps } from './ui';

export const Header = reflect<HeaderViewProps>({
  view: HeaderView,
  bind: {
    viewer: viewerModel.$viewer,
    isAuthenticated: viewerModel.$isAuthenticated,
  },
});

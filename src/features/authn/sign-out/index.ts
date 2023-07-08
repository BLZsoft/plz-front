import { reflect } from '@effector/reflect';

import { Button } from '~/shared/ui/button';

import { signOutFx } from './model';

export const SignOutButton = reflect({
  view: Button,
  bind: {
    onClick: signOutFx,
  },
});

export { signOutFx };

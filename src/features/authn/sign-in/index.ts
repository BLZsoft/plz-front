import { reflect } from '@effector/reflect';

import { Button } from '~/shared/ui/button';

import { signInFx } from './model';

export const SignInButton = reflect({
  view: Button,
  bind: {
    onClick: signInFx,
  },
});

export { signInFx };

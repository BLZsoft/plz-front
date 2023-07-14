import { reflect } from '@effector/reflect';

import { signOutFx } from '~/features/authn/sign-out';

import { ProfileMenuView } from './ui';

export const ProfileMenu = reflect({
  view: ProfileMenuView,
  bind: {
    onSignOut: signOutFx,
  },
});

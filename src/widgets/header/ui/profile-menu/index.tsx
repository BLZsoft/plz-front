import { reflect } from '@effector/reflect';

import { signOutFx } from '~/features/authn/sign-out';

import { organizationModel } from '~/entities/organization';

import { routes } from '~/shared/lib/router';

import { ProfileMenuView } from './ui';

export const ProfileMenu = reflect({
  view: ProfileMenuView,
  bind: {
    organization: organizationModel.$organization,
    onProfile: routes.profile.open,
    onSignOut: signOutFx,
  },
});

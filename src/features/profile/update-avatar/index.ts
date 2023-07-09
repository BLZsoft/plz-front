import { reflect } from '@effector/reflect';

import * as model from './model';
import { ProfileUpdateAvatarView } from './ui';

export const ProfileUpdateAvatar = reflect({
  view: ProfileUpdateAvatarView,
  bind: {
    onSubmit: model.updateAvatarFx,
  },
});

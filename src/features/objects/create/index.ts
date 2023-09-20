import { FC } from 'react';

import { reflect } from '@effector/reflect';

import { createObjectFx } from './model';
import { ObjectCreateFormView } from './ui';

export const ObjectCreateForm: FC<{ organizationId?: string; userId: string }> = reflect({
  view: ObjectCreateFormView,
  bind: {
    onSubmit: createObjectFx,
  },
});

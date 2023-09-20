import { reflect } from '@effector/reflect';

import { createObjectFx } from './model';
import { ObjectCreateFormView } from './ui';

export const ObjectCreateForm = reflect({
  view: ObjectCreateFormView,
  bind: {
    onSubmit: createObjectFx,
  },
});

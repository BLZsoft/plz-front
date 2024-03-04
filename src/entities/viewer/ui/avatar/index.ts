import { variant } from '@effector/reflect';

import { $isLoading, $picture } from './model';
import { Loading, View } from './ui';

export const ViewerAvatar = variant({
  if: $isLoading,
  then: Loading,
  else: View,
  bind: {
    src: $picture,
  },
});

import { variant } from '@effector/reflect';

import { $isLoading, $picture } from './model';
import { Loading, Props, View } from './ui';

export const ViewerAvatar = variant<Props>({
  if: $isLoading,
  then: Loading,
  else: View,
  bind: {
    src: $picture,
  },
});

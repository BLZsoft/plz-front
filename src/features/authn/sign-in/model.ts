import { createEffect } from 'effector';

import { baseUrl } from '~/shared/config/base-url';
import { logtoClient } from '~/shared/lib/logto';

export const signInFx = createEffect(() => logtoClient.signIn(baseUrl + '/logto/callback'));

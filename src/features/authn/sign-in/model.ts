import { createEffect } from 'effector';

import { logtoClient } from '~/shared/lib/logto';

const baseUrl = window.location.origin;

export const signInFx = createEffect(() => logtoClient.signIn(baseUrl + '/logto/callback'));

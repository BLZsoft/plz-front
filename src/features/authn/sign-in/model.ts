import { createEffect, sample } from 'effector';

import { organizationsModel } from '~/entities/organizations';
import { viewerModel } from '~/entities/viewer';

import { baseUrl } from '~/shared/config/base-url';
import { logtoClient } from '~/shared/lib/logto';

export const signInFx = createEffect(() => logtoClient.signIn(baseUrl + '/logto/callback'));

sample({
  clock: viewerModel.fetchUserInfoFx.doneData,
  target: organizationsModel.getAvailableOrganizationsFx,
});

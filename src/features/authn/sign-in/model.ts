import { createEffect, sample } from 'effector';

import { organizationsModel } from '~/entities/organizations';
import { viewerModel } from '~/entities/viewer';

import { logtoClient } from '~/shared/lib/logto';

const baseUrl = window.location.origin;

export const signInFx = createEffect(() => logtoClient.signIn(baseUrl + '/logto/callback'));

sample({
  clock: viewerModel.fetchUserInfoFx.doneData,
  target: organizationsModel.getAvailableOrganizationsFx,
});

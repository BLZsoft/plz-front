import LogtoClient, { UserInfoResponse } from '@logto/browser';
import { attach, createEffect, createStore, sample } from 'effector';

import { $logtoClient } from '~/shared/lib/logto';

export type Session = UserInfoResponse;

const $session = createStore<Session | null>(null);

const fetchSessionFx = attach({
  source: $logtoClient,
  effect: createEffect((logtoClient: LogtoClient | null) => {
    if (!logtoClient) {
      throw new Error('Logto client is not initialized');
    }

    return logtoClient.fetchUserInfo();
  }),
});

sample({ clock: $logtoClient.updates, target: fetchSessionFx });
sample({ clock: fetchSessionFx.doneData, target: $session });

export const sessionModel = {
  $session,
  fetchSessionFx,
};

import LogtoClient, { UserInfoResponse } from '@logto/browser';
import { attach, createEffect, createStore, sample } from 'effector';

import { $logtoClient, setupLogtoClientFx } from '~/shared/lib/logto';

export type Session = UserInfoResponse;

export const $session = createStore<Session | null>(null);

export const fetchSessionFx = attach({
  source: $logtoClient,
  effect: createEffect((logtoClient: LogtoClient | null) => {
    if (!logtoClient) {
      throw new Error('Logto client is not initialized');
    }

    return logtoClient.fetchUserInfo();
  }),
});

sample({ clock: setupLogtoClientFx.doneData, target: fetchSessionFx });
sample({ clock: fetchSessionFx.doneData, target: $session });

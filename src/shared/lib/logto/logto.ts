import LogtoClient from '@logto/browser';
import { attach, createEffect, createStore, sample } from 'effector';

import { appStarted } from '~/shared/lifecycle';

import { logtoConfig, LogtoResource } from './config';

export const $logtoClient = createStore<LogtoClient | null>(null, {
  serialize: 'ignore',
});

export const setupLogtoClientFx = createEffect(() => new LogtoClient(logtoConfig));

export const fetchResourceTokenFx = attach({
  source: $logtoClient,
  effect: createEffect(({ logtoClient, resource }) => {
    if (!logtoClient) {
      throw new Error('Logto client is not initialized');
    }

    return logtoClient.getAccessToken(resource);
  }),
  mapParams: (resource: LogtoResource, logtoClient) => ({ logtoClient, resource }),
});

sample({ clock: appStarted, target: setupLogtoClientFx });
sample({ clock: setupLogtoClientFx.doneData, target: $logtoClient });

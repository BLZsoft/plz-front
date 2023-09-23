import { allSettled, fork } from 'effector';
import { expect, it, vi } from 'vitest';

import { appStarted } from '~/shared/lifecycle';

import { $logtoClient, fetchResourceTokenFx, setupLogtoClientFx } from '../logto';

it('should initialize "$logtoClient" from "setupLogtoClientFx" on "appStarted"', async () => {
  const mockClient = {};

  const setupLogtoClient = vi.fn(() => mockClient);

  const scope = fork({
    handlers: [[setupLogtoClientFx, setupLogtoClient]],
  });

  await allSettled(appStarted, { scope });

  expect(setupLogtoClient).toHaveBeenCalledOnce();

  expect(scope.getState($logtoClient)).toBe(mockClient);
});

it('should call "getAccessToken" on "$logtoClient" when "fetchResourceTokenFx" is called', async () => {
  const resource = 'some_resource';

  const mockClient = {
    getAccessToken: vi.fn(),
  };

  const scope = fork({
    values: [[$logtoClient, mockClient]],
  });

  await allSettled(fetchResourceTokenFx, { scope, params: resource });

  expect(mockClient.getAccessToken).toHaveBeenCalledOnce();
  expect(mockClient.getAccessToken).toHaveBeenCalledWith(resource);
});

it('should fail "fetchResourceTokenFx" when "$logtoClient" is not initialized', async () => {
  const resource = 'some_resource';

  const spy = vi.fn();
  fetchResourceTokenFx.failData.watch(spy);

  const scope = fork();

  await allSettled(fetchResourceTokenFx, { scope, params: resource });

  expect(spy).toHaveBeenCalledOnce();
  expect(spy).toHaveBeenCalledWith(new Error('Logto client is not initialized'));
});

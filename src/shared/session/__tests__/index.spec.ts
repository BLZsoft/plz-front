import { allSettled, fork } from 'effector';
import { describe, expect, it, vi } from 'vitest';

import { $logtoClient } from '~/shared/lib/logto';

import { sessionModel } from '../index';

describe('fetchSessionFx', () => {
  it('should be called on "$logtoClient.updates"', () => {
    const fetchSession = vi.fn();
    const scope = fork({
      handlers: [[sessionModel.fetchSessionFx, fetchSession]],
    });

    allSettled($logtoClient.updates, { scope, params: null });

    expect(fetchSession).toHaveBeenCalledOnce();
  });

  it('should throw error if "$logtoClient" is null', () => {
    const spy = vi.fn();
    sessionModel.fetchSessionFx.failData.watch(spy);

    const scope = fork();

    allSettled(sessionModel.fetchSessionFx, { scope, params: null });

    expect(spy).toHaveBeenCalledWith(new Error('Logto client is not initialized'));
  });

  it('should call "fetchUserInfo" on "$logtoClient" if present', () => {
    const logtoClient = {
      fetchUserInfo: vi.fn(),
    };

    const scope = fork({
      values: [[$logtoClient, logtoClient]],
    });

    allSettled(sessionModel.fetchSessionFx, { scope, params: null });

    expect(logtoClient.fetchUserInfo).toHaveBeenCalledOnce();
  });
});

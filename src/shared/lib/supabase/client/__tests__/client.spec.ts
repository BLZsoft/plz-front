import { createClient } from '@supabase/supabase-js';
import { allSettled, fork } from 'effector';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { LogtoResource, fetchResourceTokenFx } from '~/shared/lib/logto';
import { sessionModel } from '~/shared/session';

import { $supabaseClient, ensureTokenFx, fetchTokenFx } from '..';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../config';
import { $token, $tokenExpiration, tokenChanged } from '../token';

const mockClient = {};
vi.mock('@supabase/supabase-js', () => ({ createClient: vi.fn(() => mockClient) }));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('setupSupabaseFx', async () => {
  it("should setup '$supabaseClient' on 'tokenChanged'", async () => {
    const scope = fork();

    await allSettled(tokenChanged, { scope, params: 'test_token' });

    expect(scope.getState($supabaseClient)).toBe(mockClient);
  });

  it('should setup unauthenticated client when token is null', async () => {
    const scope = fork();

    await allSettled(tokenChanged, { scope, params: null });

    expect(createClient).toHaveBeenCalledWith(SUPABASE_URL, SUPABASE_ANON_KEY);
  });

  it('should setup authenticated client when token present', async () => {
    const token = 'test_token';

    const tokenParams = {
      global: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    };

    const scope = fork();

    await allSettled(tokenChanged, { scope, params: token });

    expect(createClient).toHaveBeenCalledWith(SUPABASE_URL, SUPABASE_ANON_KEY, expect.objectContaining(tokenParams));
  });
});

describe('fetchTokenFx', () => {
  it('should throw error when client is not initialized', async () => {
    const scope = fork();

    const spy = vi.fn();
    fetchTokenFx.failData.watch(spy);

    await allSettled(fetchTokenFx, { scope });

    expect(spy).toHaveBeenCalledWith(new Error('Supabase client is not initialized'));
  });

  it('should exchange "fetchResourceTokenFx" token with "$supabaseClient"', async () => {
    const externalToken = 'external_token';
    const internalToken = 'internal_token';

    const supabaseClient = {
      functions: {
        invoke: vi.fn(() => ({ data: internalToken })),
      },
    };

    const fetchResourceToken = vi.fn(() => externalToken);

    const scope = fork({
      values: [[$supabaseClient, supabaseClient]],
      handlers: [[fetchResourceTokenFx, fetchResourceToken]],
    });

    await allSettled(fetchTokenFx, { scope });

    expect(fetchResourceToken).toHaveBeenCalledWith(
      null,
      expect.objectContaining({
        resource: LogtoResource.Supabase,
      }),
    );

    expect(supabaseClient.functions.invoke).toHaveBeenCalledWith(
      'exchangeToken',
      expect.objectContaining({
        headers: {
          Authorization: `Bearer ${externalToken}`,
        },
      }),
    );
  });
});

describe('ensureTokenFx', () => {
  it('should call "tokenChanged" with result', async () => {
    const token = 'test_token';
    const ensureToken = vi.fn(() => token);

    const spy = vi.fn();
    tokenChanged.watch(spy);

    const scope = fork({
      handlers: [[ensureTokenFx, ensureToken]],
    });

    allSettled(ensureTokenFx, { scope });

    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(token);
  });

  describe('returns', () => {
    const oldToken = 'old_token';
    const newToken = 'new_token';

    function getScope({ session, token, expired }: { session: boolean; token: boolean; expired: boolean | null }) {
      const session_ = session ? {} : null;
      const token_ = token ? oldToken : null;

      const now = Date.now() / 1000;
      const tokenExpiration = expired === null ? null : expired ? now + 1000 : now - 1000;

      const tokenChangedSpy = vi.fn();
      tokenChanged.watch(tokenChangedSpy);

      const fetchTokenSpy = vi.fn(() => newToken);

      const scope = fork({
        handlers: [[fetchTokenFx, fetchTokenSpy]],
        values: [
          [sessionModel.$session, session_],
          [$token, token_],
          [$tokenExpiration, tokenExpiration],
        ],
      });

      return {
        scope,
        values: { session: session_, token: token_, tokenExpiration },
        spies: {
          tokenChangedSpy,
          fetchTokenSpy,
        },
      };
    }

    beforeEach(() => {
      vi.clearAllMocks();
    });

    it.each([
      { session: false, token: true, expired: false, expected: null, fetchNew: false }, // token fully valid, but user unauthorized
      { session: true, token: true, expired: null, expected: newToken, fetchNew: true }, // random string instead of token, cannot parse expiration
      { session: true, token: true, expired: true, expected: newToken, fetchNew: true }, // token expired
      { session: true, token: false, expired: null, expected: newToken, fetchNew: true }, // token not present
      { session: true, token: true, expired: false, expected: oldToken, fetchNew: false }, // token valid
    ])(
      'session: $session, token: $token, expired: $expired — returns: $expected',
      async ({ expected, fetchNew, ...params }) => {
        const {
          scope,
          spies: { tokenChangedSpy, fetchTokenSpy },
        } = getScope(params);

        await allSettled(ensureTokenFx, { scope });

        expect(fetchTokenSpy).toHaveBeenCalledTimes(fetchNew ? 1 : 0);

        if (expected === oldToken) {
          expect(tokenChangedSpy).toHaveBeenCalledTimes(0);
        } else {
          expect(tokenChangedSpy).toHaveBeenCalledWith(expected);
        }
      },
    );
  });
});

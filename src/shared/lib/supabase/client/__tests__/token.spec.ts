import { allSettled, fork } from 'effector';
import { beforeEach, expect, it, vi } from 'vitest';

import { appStarted } from '~/shared/lifecycle';

import { $parsedToken, $token, $tokenExpiration, STORAGE_KEY, tokenChanged } from '../token';
import { parse } from '../token/parse';

vi.mock('../token/parse.ts', () => ({ parse: vi.fn() }));

beforeEach(() => {
  vi.clearAllMocks();
});

it('should load "$token" from localStorage on "appStarted"', async () => {
  const token = 'test_token';

  localStorage.setItem(STORAGE_KEY, JSON.stringify(token));

  const scope = fork();

  await allSettled(appStarted, { scope });

  expect(scope.getState($token)).toBe(token);
});

it('should save "$token" to localStorage on "tokenChanged"', async () => {
  const token = 'start_token';
  const newToken = 'new_token';

  const scope = fork({
    values: [[$token, token]],
  });

  await allSettled(tokenChanged, { scope, params: newToken });

  const localStorageToken = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '');

  expect(scope.getState($token)).toBe(newToken);
  expect(localStorageToken).toBe(newToken);
});

it('should calculate "$parsedToken" from "$token" and fill "$tokenValid", "$tokenExpiration"', async () => {
  const token = 'test_token';

  const iat = Date.now() / 1000;
  const exp = iat + 3600;

  const parsedToken = {
    jti: 'token_id',
    sub: 'user_id',
    iat,
    exp,
    scope: '',
    client_id: 'app_id',
    iss: 'issuer',
  };

  vi.mocked(parse).mockReturnValue(parsedToken);

  const scope = fork();

  await allSettled(tokenChanged, { scope, params: token });

  expect(parse).toHaveBeenCalledOnce();
  expect(parse).toHaveBeenCalledWith(token, undefined);

  expect(scope.getState($parsedToken)).toEqual(parsedToken);
  expect(scope.getState($tokenExpiration)).toBe(exp);
});

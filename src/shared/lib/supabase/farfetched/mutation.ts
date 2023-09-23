import { Contract, InvalidDataError, Mutation, createMutation } from '@farfetched/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Effect, attach, createEffect } from 'effector';

import { $supabaseClient, ensureTokenFx } from '../client';
import { Database } from '../database.types';

import { SupabaseParams } from './types';

//#region overloads
export function createSupabaseMutation<Params, Data, Error>(config: {
  effect: Effect<Params & SupabaseParams, Data, Error>;
}): Mutation<Params, Data, Error>;

export function createSupabaseMutation<Params, Data, ContractData extends Data, Error>(config: {
  effect: Effect<Params & SupabaseParams, Data, Error>;
  contract: Contract<Data, ContractData>;
}): Mutation<Params, ContractData, Error | InvalidDataError>;
// #endregion

export function createSupabaseMutation(config) {
  const executeFx = createEffect(async (params) => {
    await ensureTokenFx();

    const withSupabaseFx = (() => {
      const eFx = attach({
        effect: config.effect,
        source: $supabaseClient,
        mapParams: (params: Record<string, unknown>, supabase: SupabaseClient<Database> | null) => ({
          ...params,
          supabase,
        }),
      });

      eFx.sid = [config.effect.sid, eFx.sid].join('|');

      return eFx;
    })();

    return withSupabaseFx(params);
  });

  executeFx.sid = [config.effect.sid, executeFx.sid].join('|');

  return createMutation({
    ...config,
    effect: executeFx,
  });
}

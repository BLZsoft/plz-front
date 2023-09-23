import { Contract, DynamicallySourcedField, InvalidDataError, Query, Validator, createQuery } from '@farfetched/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Effect, attach, createEffect } from 'effector';

import { $supabaseClient, ensureTokenFx } from '../client';
import { Database } from '../database.types';

import { SupabaseParams } from './types';

//#region overloads
export function createSupabaseQuery<
  Params,
  Response,
  Error,
  MappedData,
  MapDataSource = void,
  ValidationSource = void,
>(config: {
  effect: Effect<Params & SupabaseParams, Response, Error>;
  mapData: DynamicallySourcedField<
    {
      result: Response;
      params: Params;
    },
    MappedData,
    MapDataSource
  >;
  validate?: Validator<MappedData, Params, ValidationSource>;
}): Query<Params, MappedData, Error>;
export function createSupabaseQuery<Params, Response, Error>(config: {
  effect: Effect<Params & SupabaseParams, Response, Error>;
}): Query<Params, Response, Error>;
export function createSupabaseQuery<Params, Response, Error>(config: {
  initialData: Response;
  effect: Effect<Params & SupabaseParams, Response, Error>;
}): Query<Params, Response, Error, Response>;
export function createSupabaseQuery<
  Params,
  Response,
  Error,
  ContractData extends Response,
  ValidationSource = void,
>(config: {
  effect: Effect<Params & SupabaseParams, Response, Error>;
  contract: Contract<Response, ContractData>;
  validate?: Validator<ContractData, Params, ValidationSource>;
}): Query<Params, ContractData, Error | InvalidDataError>;
export function createSupabaseQuery<
  Params,
  Response,
  Error,
  ContractData extends Response,
  ValidationSource = void,
>(config: {
  initialData: ContractData;
  effect: Effect<Params & SupabaseParams, Response, Error>;
  contract: Contract<Response, ContractData>;
  validate?: Validator<ContractData, Params, ValidationSource>;
}): Query<Params, ContractData, Error | InvalidDataError, ContractData>;
export function createSupabaseQuery<
  Params,
  Response,
  Error,
  MappedData,
  MapDataSource = void,
  ValidationSource = void,
>(config: {
  initialData: MappedData;
  effect: Effect<Params & SupabaseParams, Response, Error>;
  mapData: DynamicallySourcedField<
    {
      result: Response;
      params: Params;
    },
    MappedData,
    MapDataSource
  >;
  validate?: Validator<MappedData, Params, ValidationSource>;
}): Query<Params & SupabaseParams, MappedData, Error, MappedData>;
export function createSupabaseQuery<
  Params,
  Response,
  Error,
  ContractData extends Response,
  MappedData,
  MapDataSource = void,
  ValidationSource = void,
>(config: {
  effect: Effect<Params & SupabaseParams, Response, Error>;
  contract: Contract<Response, ContractData>;
  mapData: DynamicallySourcedField<
    {
      result: ContractData;
      params: Params;
    },
    MappedData,
    MapDataSource
  >;
  validate?: Validator<ContractData, Params, ValidationSource>;
}): Query<Params, MappedData, Error | InvalidDataError>;
export function createSupabaseQuery<
  Params,
  Response,
  Error,
  ContractData extends Response,
  MappedData,
  MapDataSource = void,
  ValidationSource = void,
>(config: {
  initialData: MappedData;
  effect: Effect<Params & SupabaseParams, Response, Error>;
  contract: Contract<Response, ContractData>;
  mapData: DynamicallySourcedField<
    {
      result: ContractData;
      params: Params;
    },
    MappedData,
    MapDataSource
  >;
  validate?: Validator<ContractData, Params, ValidationSource>;
}): Query<Params, MappedData, Error | InvalidDataError, MappedData>;
// #endregion

export function createSupabaseQuery(config) {
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

  return createQuery({
    ...config,
    effect: executeFx,
  });
}

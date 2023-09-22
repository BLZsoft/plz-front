import { Contract, DynamicallySourcedField, Validator } from '@farfetched/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Effect } from 'effector';

import { Database } from '../../database.types';

export type EffectParams<Params> = Params & { supabase: SupabaseClient<Database> };

type SimpleEffectConfig<Params, Response, Error> = {
  initialData?: Response;
  effect: Effect<EffectParams<Params>, Response, Error>;
};

type ContractConfig<Params, Response, Error, ContractData extends Response, ValidationSource = void> = {
  initialData?: ContractData;
  effect: Effect<EffectParams<Params>, Response, Error>;
  contract: Contract<Response, ContractData>;
  validate?: Validator<ContractData, Params, ValidationSource>;
};

type MapDataConfig<Params, Response, Error, MappedData, MapDataSource = void, ValidationSource = void> = {
  initialData?: MappedData;
  effect: Effect<EffectParams<Params>, Response, Error>;
  mapData: DynamicallySourcedField<
    {
      result: Response;
      params: Params;
    },
    MappedData,
    MapDataSource
  >;
  validate?: Validator<MappedData, Params, ValidationSource>;
};

type ContractAndMapDataConfig<
  Params,
  Response,
  Error,
  ContractData extends Response,
  MappedData,
  MapDataSource = void,
  ValidationSource = void,
> = {
  initialData?: MappedData;
  effect: Effect<EffectParams<Params>, Response, Error>;
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
};

export type SupabaseQueryConfig<
  Params,
  Response,
  Error,
  ContractData extends Response,
  MappedData,
  MapDataSource = void,
  ValidationSource = void,
> =
  | SimpleEffectConfig<Params, Response, Error>
  | ContractConfig<Params, Response, Error, ContractData, ValidationSource>
  | MapDataConfig<Params, Response, Error, MappedData, MapDataSource, ValidationSource>
  | ContractAndMapDataConfig<Params, Response, Error, ContractData, MappedData, MapDataSource, ValidationSource>;

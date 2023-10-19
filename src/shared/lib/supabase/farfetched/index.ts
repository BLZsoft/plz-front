import { createEffect } from 'effector';

import { SupabaseParams } from './types';

export { createSupabaseMutation } from './mutation';
export { createSupabaseQuery } from './query';

export const createSupabaseEffect = <Params = void, Done = unknown, Fail = Error>(
  handler: (params: Params & SupabaseParams) => Done | Promise<Done>,
  { sid, name }: { sid?: string; name?: string } = {},
) => createEffect<Params & SupabaseParams, Done, Fail>({ handler, sid, name });

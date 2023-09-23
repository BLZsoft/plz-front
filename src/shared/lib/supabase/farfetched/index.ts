import { createEffect } from 'effector';

import { SupabaseParams } from './types';

export { createSupabaseQuery } from './query';
export { createSupabaseMutation } from './mutation';

export const createSupabaseEffect = <Params, Done, Fail = Error>(
  handler: (params: Params & SupabaseParams) => Done | Promise<Done>,
  { sid, name }: { sid?: string; name?: string } = {},
) => createEffect<Params & SupabaseParams, Done, Fail>({ handler, sid, name });

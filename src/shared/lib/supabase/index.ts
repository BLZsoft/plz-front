/**
 * @deprecated use getSupabaseFx instead
 */
export { supabaseManager } from './__old__';

export { $supabaseClient, ensureTokenFx, setupSupabaseFx } from './client';

export { createSupabaseEffect, createSupabaseQuery, createSupabaseMutation } from './farfetched';

export type { Database } from './database.types';

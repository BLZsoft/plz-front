import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { SUPABASE_ANON_KEY, SUPABASE_URL } from '~/shared/config/supabase';
import { LOGTO_RESOURCES, logtoClient } from '~/shared/lib/logto';

import { Database } from './database.types';

// TODO: @d.tankov — сохранять supabase токен в localStorage и переиспользовать клиент (как logtoClient)

export const anonSupabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

export const getAuthnSupabase = async (): Promise<SupabaseClient<Database>> => {
  return anonSupabase;

  const authenticated = await logtoClient.isAuthenticated();

  if (authenticated) {
    const logtoToken = await logtoClient.getAccessToken(LOGTO_RESOURCES.Supabase);

    const { data: supabaseToken, error } = await anonSupabase.functions.invoke<string>('exchangeToken', {
      headers: {
        Authorization: `Bearer ${logtoToken}`,
      },
    });

    if (error) {
      throw error;
    }

    return createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: {
        headers: {
          Authorization: `Bearer ${supabaseToken}`,
        },
      },
    });
  }

  return anonSupabase;
};

export type { Database };

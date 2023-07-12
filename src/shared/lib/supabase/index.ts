import { SUPABASE_ANON_KEY, SUPABASE_URL } from '~/shared/config/supabase';
import { LOGTO_RESOURCES, logtoClient } from '~/shared/lib/logto';

import { Database } from './database.types';
import { SupabaseSessionManager } from './supabase-session-manager';
import { LogtoSupabaseSessionProvider } from './supabase-session-manager/session-provider/logto';
import { LocalStorageSupabaseSessionStorage } from './supabase-session-manager/session-storage/local-storage';

// TODO: @d.tankov — сохранять supabase токен в localStorage и переиспользовать клиент (как logtoClient)

export const supabaseManager = new SupabaseSessionManager<Database>({
  supabaseUrl: SUPABASE_URL,
  supabaseAnonKey: SUPABASE_ANON_KEY,
  sessionProvider: new LogtoSupabaseSessionProvider(logtoClient, LOGTO_RESOURCES.Supabase),
  sessionStorage: new LocalStorageSupabaseSessionStorage('supabaseToken'),
});

export type { Database };

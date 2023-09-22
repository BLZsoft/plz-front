import { SupabaseClient } from '@supabase/supabase-js';

import { Database } from '../database.types';

export type SupabaseParams = { supabase: SupabaseClient<Database> | null };

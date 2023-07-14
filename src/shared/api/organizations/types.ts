import { Database } from '~/shared/lib/supabase';

// id: null — Личное пространство
export type Organization = Database['public']['Tables']['organizations']['Row'];

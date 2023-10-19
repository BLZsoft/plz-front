import { Database } from '~/shared/lib/supabase';

export type ObjectType = Database['public']['Tables']['object-types']['Row'];

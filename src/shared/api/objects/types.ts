import { Database } from '~/shared/lib/supabase';

export type Object = Database['public']['Tables']['objects']['Row'];

export type CreateObjectDto = Database['public']['Tables']['objects']['Insert'];
export type UpdateObjectDto = Database['public']['Tables']['objects']['Update'];

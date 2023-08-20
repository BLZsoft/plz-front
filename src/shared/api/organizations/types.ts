import { Database } from '~/shared/lib/supabase';

// id: null — Личное пространство
export type Organization = Database['public']['Tables']['organizations']['Row'];

export type CreateOrganizationDto = Database['public']['Tables']['organizations']['Insert'];

export type UpdateOrganizationDto = Database['public']['Tables']['organizations']['Update'];

export type Membership = Database['public']['Tables']['members_to_organizations']['Row'];

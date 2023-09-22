import { z } from 'zod';

import { UserData } from '~/shared/api/profile';
import { Database } from '~/shared/lib/supabase';

// id: null — Личное пространство
export type Organization = Database['public']['Tables']['organizations']['Row'];
export const Organization = z.object({
    id: z.string().uuid(),
    name: z.string().nonempty(),
    image: z.string().url().nullable(),
    created_at: z.string().nonempty(),
});

export type CreateOrganizationDto = Database['public']['Tables']['organizations']['Insert'];

export type UpdateOrganizationDto = Database['public']['Tables']['organizations']['Update'];

export type Membership = Database['public']['Tables']['members_to_organizations']['Row'];

export type MemberData = UserData & { role: string | null };

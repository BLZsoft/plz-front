import { zodContract } from '@farfetched/zod';

import { usersApi } from '~/shared/api/users';
import { createSupabaseEffect, createSupabaseQuery, supabaseManager } from '~/shared/lib/supabase';

import { CreateOrganizationDto, MemberData, Membership, Organization } from './types';

/**
 * @deprecated use query instead
 */
export async function availableOrganizations(): Promise<Organization[]> {
  const supabaseClient = await supabaseManager.getClient();

  const { data, error } = await supabaseClient.from('organizations').select();

  if (!data) {
    throw error;
  }

  return data;
}

export async function createOrganization(organization: CreateOrganizationDto): Promise<Organization> {
  const supabaseClient = await supabaseManager.getClient();

  /* Из-за особенностей порядка RLS и Trigger — нельзя сразу получить созданную организацию */
  await supabaseClient.from('organizations').insert(organization);

  /* Так что получаем следующим запросом */
  const { data, error } = await supabaseClient
    .from('organizations')
    .select()
    .eq('name', organization.name)
    .order('created_at', { ascending: false })
    .limit(1);

  if (!data || error) {
    throw error;
  }

  return data[0];
}

export async function fetchMemberships(organizationId: string): Promise<Membership[]> {
  const supabaseClient = await supabaseManager.getClient();

  const { data, error } = await supabaseClient
    .from('members_to_organizations')
    .select()
    .eq('organization_id', organizationId);

  if (!data) {
    throw error;
  }

  return data;
}

export async function removeMember(organizationId: string, memberId: string): Promise<string> {
  const supabaseClient = await supabaseManager.getClient();

  const { error } = await supabaseClient
    .from('members_to_organizations')
    .delete()
    .eq('organization_id', organizationId)
    .eq('owner_id', memberId);

  if (error) {
    throw error;
  }

  return memberId;
}

export async function inviteMember(organizationId: string, phone: string): Promise<MemberData> {
  const supabaseClient = await supabaseManager.getClient();

  const usersWithPhone = await usersApi.getUserByFields({ phone });
  const userToInvite = usersWithPhone[0];

  const { error } = await supabaseClient
    .from('members_to_organizations')
    .insert({ user_id: userToInvite.id, organization_id: organizationId });

  if (error) {
    throw error;
  }

  return { ...userToInvite, role: 'member' };
}

export const query = createSupabaseQuery({
  effect: createSupabaseEffect(async ({ supabase }) => {
    const { data, error } = await supabase.from('organizations').select();

    if (!data || error) throw error;

    return data;
  }),
  contract: zodContract(Organization.array()),
});

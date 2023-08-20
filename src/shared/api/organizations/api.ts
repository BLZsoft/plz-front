import { logtoClient } from '~/shared/lib/logto';
import { supabaseManager } from '~/shared/lib/supabase';

import { CreateOrganizationDto, Membership, Organization } from './types';

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

  if (!data) {
    throw error;
  }

  return data[0];
}

export async function fetchRole(organizationId: string): Promise<string> {
  const { sub: userId } = await logtoClient.fetchUserInfo();
  const supabaseClient = await supabaseManager.getClient();

  const { data, error } = await supabaseClient
    .from('members_to_organizations')
    .select()
    .eq('user_id', userId)
    .eq('organization_id', organizationId);

  if (!data || !data[0].role) {
    throw error;
  }

  return data[0].role;
}

export async function fetchMembers(organizationId: string): Promise<Membership[]> {
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
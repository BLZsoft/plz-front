import { zodContract } from '@farfetched/zod';
import { createEffect, sample } from 'effector';
import { debug } from 'patronum';

import { usersApi } from '~/shared/api/users';
import { createSupabaseEffect, createSupabaseQuery, supabaseManager } from '~/shared/lib/supabase';
import { $session } from '~/shared/session';

import { CreateOrganizationDto, MemberData, Membership, Organization } from './types';

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
    .eq('user_id', memberId);

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

const testFx = createSupabaseEffect(async ({ supabase }) => {
  if (!supabase) throw new Error('Supabase client is not initialized');

  const { data, error } = await supabase.from('organizations').select();

  if (!data || error) throw error;

  return data;
});

const test2Fx = createSupabaseEffect(async ({ supabase }) => {
  if (!supabase) throw new Error('Supabase client is not initialized');

  const { data, error } = await supabase.from('organizations').select();

  if (!data || error) throw error;

  return data;
});

const test3Fx = createEffect(() => Promise.resolve('test3'));

export const organizationsQuery = createSupabaseQuery({
  effect: testFx,
  contract: zodContract(Organization.array()),
});

export const organizationsQuery2 = createSupabaseQuery({
  effect: test2Fx,
  contract: zodContract(Organization.array()),
});

sample({
  clock: $session.updates,
  fn: () => null,
  target: organizationsQuery.start,
});

sample({
  clock: $session.updates,
  fn: () => null,
  target: organizationsQuery2.start,
});

test3Fx();

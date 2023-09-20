import { supabaseManager } from '~/shared/lib/supabase';
import { Nullable } from '~/shared/lib/utils';

import { CreateObjectDto, ObjectType } from './types';

export async function objectsByOrganization(organizationId: Nullable<string>): Promise<ObjectType[]> {
  const supabaseClient = await supabaseManager.getClient();

  let query = supabaseClient.from('objects').select();

  if (organizationId) {
    query = query.eq('organization_id', organizationId);
  } else {
    query = query.is('organization_id', null);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}

export async function createObject(object: CreateObjectDto): Promise<ObjectType> {
  const supabaseClient = await supabaseManager.getClient();

  await supabaseClient.from('objects').insert(object);

  const { data, error } = await supabaseClient
    .from('objects')
    .select()
    .eq('name', object.name)
    .order('created_at', { ascending: false })
    .limit(1);

  if (!data) {
    throw error;
  }

  return data[0];
}

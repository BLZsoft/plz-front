import { supabaseManager } from '~/shared/lib/supabase';

import { Organization } from './types';

export async function availableOrganizations(): Promise<Organization[]> {
  const supabaseClient = await supabaseManager.getClient();

  const { data, error } = await supabaseClient.from('organizations').select();

  if (!data) {
    throw error;
  }

  return data;
}

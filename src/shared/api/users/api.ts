import { UserData } from '~/shared/api/profile';
import { supabaseManager } from '~/shared/lib/supabase';

import { GetUserByFieldsDto } from './types';

export async function getUserByFields(dto: GetUserByFieldsDto): Promise<UserData[]> {
  const supabaseClient = await supabaseManager.getClient();

  const { data, error } = await supabaseClient.functions.invoke('getUserByFields', {
    body: dto,
  });

  if (!data) {
    throw error;
  }

  return data;
}

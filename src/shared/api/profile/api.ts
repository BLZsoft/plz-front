import { logtoClient } from '~/shared/lib/logto';
import { supabaseManager } from '~/shared/lib/supabase';

import { Profile, UpdateProfileDto, UserData } from './types';

export function getProfile(): Promise<Profile> {
  return logtoClient.fetchUserInfo();
}

export async function updateProfile(updateProfileDto: UpdateProfileDto): Promise<UserData> {
  const supabaseClient = await supabaseManager.getClient();

  const { data, error } = await supabaseClient.functions.invoke('updateProfile', {
    body: updateProfileDto,
  });

  if (error) {
    throw error;
  }

  return data;
}

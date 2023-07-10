import { Database, getAuthnSupabase } from '~/shared/lib/supabase';

export type Organization = {
  id: string;
  picture?: string;
  name: string;
};

export type ObjectType = Database['public']['Tables']['objects']['Row'];

export type ObjectTypeResponse = ObjectType[];

async function fetchObjects(): Promise<ObjectTypeResponse> {
  const supabaseClient = await getAuthnSupabase();

  const { data, error } = await supabaseClient.from('objects').select();
  if (error) {
    throw error;
  }

  return data as ObjectTypeResponse;
}

export const objectsApi = {
  fetchObjects,
};

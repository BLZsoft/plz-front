import { createSupabaseEffect, createSupabaseQuery } from '~/shared/lib/supabase';

export const query = createSupabaseQuery({
  effect: createSupabaseEffect(async ({ supabase }) => {
    const { data, error } = await supabase.from('object-types').select();

    if (!data?.length || error) throw error;

    return data;
  }),
});

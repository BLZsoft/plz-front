import { createSupabaseEffect, createSupabaseMutation, createSupabaseQuery } from '~/shared/lib/supabase';
import { Nullable } from '~/shared/lib/utils';

import { CreateObjectDto, Object, UpdateObjectDto } from './types';

export type ObjectsQueryByIdParams = {
  id: string;
};
export const queryById = createSupabaseQuery({
  effect: createSupabaseEffect<ObjectsQueryByIdParams, Object>(async ({ supabase, id }) => {
    const { data, error } = await supabase.from('objects').select().eq('id', id);

    if (!data?.length || error) throw error;

    return data[0];
  }),
});

export type ObjectsQueryByOrgParams = {
  organizationId: Nullable<string>;
};
export const queryByOrg = createSupabaseQuery({
  effect: createSupabaseEffect<ObjectsQueryByOrgParams, Object[]>(async ({ supabase, organizationId }) => {
    let query = supabase.from('objects').select();

    if (organizationId) {
      query = query.eq('organization_id', organizationId);
    } else if (organizationId === null) {
      query = query.is('organization_id', null);
    }

    const { data, error } = await query;

    if (!data || error) throw error;

    return data;
  }),
});

export type CreateObjectMutationParams = {
  object: CreateObjectDto;
};
export const createMutation = createSupabaseMutation({
  effect: createSupabaseEffect<CreateObjectMutationParams, Object>(async ({ supabase, object }) => {
    const { data, error } = await supabase.from('objects').insert(object).select();

    if (!data || error) throw error;

    return data[0];
  }),
});

export type UpdateObjectMutationParams = {
  id: string;
  object: UpdateObjectDto;
};
export const updateMutation = createSupabaseMutation({
  effect: createSupabaseEffect<UpdateObjectMutationParams, Object>(async ({ supabase, id, object }) => {
    const { data, error } = await supabase.from('objects').update(object).eq('id', id).select();

    if (!data || error) throw error;

    return data[0];
  }),
});

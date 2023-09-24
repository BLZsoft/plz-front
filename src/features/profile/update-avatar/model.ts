import { createEffect, sample } from 'effector';


import { profileApi } from '~/shared/api/profile';
import { supabaseManager } from '~/shared/lib/supabase';
import { uuid } from '~/shared/lib/utils';
import { sessionModel } from '~/shared/session';

export const updateAvatarFx = createEffect<Blob | null, string>(async (newAvatar) => {
  if (!newAvatar) {
    throw new Error("New avatar doesn't provided");
  }

  // TODO: attach session store to effect
  // eslint-disable-next-line effector/no-getState
  const userId = sessionModel.$session.getState()?.sub;
  if (!userId) {
    throw new Error('Can not get current user id');
  }

  const supabaseClient = await supabaseManager.getClient();

  const fileName = uuid();
  const { data: uploadResult, error } = await supabaseClient.storage
    .from('avatars')
    .upload(`${userId}/${fileName}.png`, newAvatar);

  if (error) {
    throw error;
  }

  const { data } = supabaseClient.storage.from('avatars').getPublicUrl(uploadResult?.path);

  await profileApi.updateProfile({
    avatar: data.publicUrl,
  });

  return data.publicUrl;
});

sample({
  clock: updateAvatarFx.doneData,
  target: sessionModel.fetchSessionFx,
});

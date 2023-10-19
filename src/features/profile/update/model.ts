import { sample } from 'effector';
import { createEffect } from 'effector/compat';
import { z } from 'zod';

import { profileApi, UpdateProfileDto, UserData } from '~/shared/api/profile';
import { sessionModel } from '~/shared/session';

export const formSchema = z.object({
  username: z
    .string()
    .regex(/^[A-Z_a-z]\w*$/, 'Имя пользователя может содержать только буквы, цифры или символы подчеркивания'),
  primaryEmail: z.string().email('Введите корректный Email'),
  primaryPhone: z.string().regex(/^\d+$/, 'Введите корректный номер телефона'),
  name: z.string(),
});

export type FormValues = z.infer<typeof formSchema>;

export const updateProfileFx = createEffect<UpdateProfileDto, UserData>((data) => profileApi.updateProfile(data));

sample({
  clock: updateProfileFx.doneData,
  target: sessionModel.fetchSessionFx,
});

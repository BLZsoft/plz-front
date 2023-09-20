import { sample } from 'effector';
import { createEffect } from 'effector/compat';
import { z } from 'zod';

import { CreateObjectDto, ObjectType, objectsApi } from '~/shared/api/objects';
import { toast } from '~/shared/ui/use-toast';

export const formSchema = z.object({
  name: z.string(),
  address: z.string(),
  height: z.string(),
  floor: z.string(),
  fireRoomArea: z.string(),
});

export type FormValues = z.infer<typeof formSchema>;

export const defaultValues: FormValues = {
  name: '',
  address: '',
  height: '',
  floor: '',
  fireRoomArea: '',
};

export const createObjectFx = createEffect<CreateObjectDto, ObjectType>((data) =>
  objectsApi.createObject(data),
);

sample({
  clock: createObjectFx.doneData,
  fn: ({ name }) =>
    toast({
      title: 'Успех!',
      description: `Объект ${name} создан`,
    }),
});

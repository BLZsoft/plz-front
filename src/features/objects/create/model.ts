import { sample } from 'effector';
import { createEffect } from 'effector/compat';
import { z } from 'zod';

import { CreateObjectDto, ObjectType, objectsApi } from '~/shared/api/objects';
import { AddressSuggestionSchemaZ } from '~/shared/forms-ui/address-input';
import { toast } from '~/shared/ui/use-toast';

// TODO: пока так ибо не знаем где создаем в личном или в орге
export const formSchema = z.object({
  organizationId: z.string().nonempty().nullish(),
  userId: z.string().nonempty(),

  name: z.string().nonempty(),
  address: AddressSuggestionSchemaZ,
  floors: z.number().positive(),
  height: z.number().positive(),
  // TODO: width сделать обязательным?
  width: z.number().positive().nullish(),
  fireRoomArea: z.number().positive(),
});

export type FormValues = z.infer<typeof formSchema>;

export const initializeDefaultValues = ({
  organizationId,
  userId,
}: {
  organizationId?: string;
  userId: string;
}): FormValues => ({
  organizationId,
  userId,

  name: '',
  address: {
    value: '',
  },
  floors: 0,
  height: 0,
  fireRoomArea: 0,
});

export const createObjectFx = createEffect<FormValues, ObjectType>((data) => {
  const normalizedPayload: CreateObjectDto = {
    organization_id: data.organizationId,
    user_id: data.organizationId ? undefined : data.userId,

    name: data.name,
    address: data.address.value,
    floors: data.floors,
    height: data.height,
    width: data.width,
    fire_room_area: data.fireRoomArea,
  };

  return objectsApi.createObject(normalizedPayload);
});

// todo: $toastApi
// eslint-disable-next-line effector/no-useless-methods
sample({
  clock: createObjectFx.doneData,
  fn: ({ name }) =>
    toast({
      title: 'Успех!',
      description: `Объект ${name} создан`,
    }),
});

// eslint-disable-next-line effector/no-useless-methods
sample({
  clock: createObjectFx.failData,
  fn: () =>
    toast({
      title: 'Ошибка!',
      description: `Произошла ошибка при создании объекта`,
    }),
});

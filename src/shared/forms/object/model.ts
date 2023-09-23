import { z } from 'zod';

import type { CreateObjectDto } from '~/shared/api/objects';

import { FieldAddressSchemaZ } from '../fields/address-input';

export const Schema = z.object({
  name: z.string().nonempty(),
  address: FieldAddressSchemaZ,
  floors: z.coerce.number().positive(),
  height: z.coerce.number().positive(),
  width: z.coerce.number().positive().nullish(),
  fireRoomArea: z.coerce.number().positive(),
});

export type Payload = Omit<CreateObjectDto, 'organization_id' | 'owner_id'>;
export type FormValues = z.infer<typeof Schema>;

export const normalizeValues = (initial?: Partial<Payload> | null): FormValues => ({
  name: initial?.name ?? '',
  address: { value: initial?.address ?? '' },
  floors: initial?.floors ?? 0,
  height: initial?.height ?? 0,
  width: initial?.width ?? 0,
  fireRoomArea: initial?.fire_room_area ?? 0,
});

export const normalizePayload = (values: FormValues): Payload => ({
  name: values.name,
  address: values.address.value,
  floors: values.floors,
  height: values.height,
  width: values.width ?? null,
  fire_room_area: values.fireRoomArea,
});

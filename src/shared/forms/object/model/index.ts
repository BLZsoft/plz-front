import { z } from 'zod';

import type { CreateObjectDto } from '~/shared/api/objects';
import { FieldAddressSchemaZ } from '~/shared/forms/fields';

export type ObjectType = {
  id: string;
  name: string;
  f: string;
  normative: string;
};

export const Schema = z.object({
  name: z.string().nonempty(),
  type: z.string().uuid(),

  address: FieldAddressSchemaZ.optional(),
  width: z.coerce.number().positive().optional(),
  category: z.string().optional(),
  abovegroundFloors: z.coerce.number().positive().optional(),
  fireCompartmentFloorArea: z.coerce.number().positive().optional(),
  height: z.coerce.number().positive().optional(),
  volume: z.coerce.number().positive().optional(),
  undergroundFloors: z.coerce.number().positive().optional(),
  hasGroundFloor: z.boolean().optional(),
  groundFloorArea: z.coerce.number().positive().optional(),
  totalSalesArea: z.coerce.number().positive().optional(),
  isUndergroundSalesArea: z.boolean().optional(),
  salesArea: z.coerce.number().positive().optional(),
  isDiningRoomInBasement: z.boolean().optional(),
  numberOfVisitors: z.coerce.number().positive().optional(),
  hasSalesRoomWithoutNaturalLight: z.boolean().optional(),
});

export type Payload = Omit<CreateObjectDto, 'organization_id' | 'owner_id'>;
export type FormValues = z.infer<typeof Schema>;

export const normalizeValues = (initial?: Partial<Payload> | null): Partial<FormValues> => ({
  name: initial?.name ?? '',
  type: initial?.type ?? undefined,

  address: { value: initial?.address ?? '' },
  width: initial?.width ?? undefined,
  category: initial?.category ?? '',
  abovegroundFloors: initial?.aboveground_floors ?? undefined,
  height: initial?.height ?? undefined,
  volume: initial?.volume ?? undefined,
  undergroundFloors: initial?.underground_floors ?? undefined,
  hasGroundFloor: initial?.has_ground_floor ?? undefined,
  groundFloorArea: initial?.ground_floor_area ?? undefined,
  totalSalesArea: initial?.total_sales_area ?? undefined,
  isUndergroundSalesArea: initial?.is_underground_sales_area ?? undefined,
  salesArea: initial?.sales_area ?? undefined,
  isDiningRoomInBasement: initial?.is_dining_room_in_basement ?? undefined,
  numberOfVisitors: initial?.number_of_visitors ?? undefined,
  hasSalesRoomWithoutNaturalLight: initial?.has_sales_room_without_natural_light ?? undefined,
});

export const normalizePayload = (values: FormValues): Payload => ({
  name: values.name,
  type: values.type,

  address: values.address?.value,
  width: values.width,
  category: values.category,
  aboveground_floors: values.abovegroundFloors,
  height: values.height,
  volume: values.volume,
  underground_floors: values.undergroundFloors,
  has_ground_floor: values.hasGroundFloor,
  ground_floor_area: values.groundFloorArea,
  total_sales_area: values.totalSalesArea,
  is_underground_sales_area: values.isUndergroundSalesArea,
  sales_area: values.salesArea,
  is_dining_room_in_basement: values.isDiningRoomInBasement,
  number_of_visitors: values.numberOfVisitors,
  has_sales_room_without_natural_light: values.hasSalesRoomWithoutNaturalLight,
});

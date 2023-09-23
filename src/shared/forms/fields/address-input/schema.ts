import { z } from 'zod';

// TODO: определить конкретные схемы для разных уровней (город, улица, дом). Данная схема напрямую описывает тип из библиотеки react-dadata
export const FieldAddressSchemaZ = z.object({
  value: z.string(),
  unrestricted_value: z.string().optional(),
});

export type FieldAddressSchema = z.infer<typeof FieldAddressSchemaZ>;
